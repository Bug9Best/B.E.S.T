<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig, onMenuToggle, contextPath } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<script>
export default {
    data() {
        return {
            user: {},
            fullName: 'Natthaphon Ditthaviboon',
            avatarLabel: '',
            items: [
                {
                    label: 'Actions',
                    items: [{
                        label: 'Profile',
                        icon: 'pi pi-user-edit',
                        command: () => {
                            this.$router.push('/profile');
                        }
                    },
                    {
                        label: 'Sign Out',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            localStorage.removeItem('token');
                            this.$router.push('/');
                        }
                    }]
                },
            ],
        }
    },
    // mounted() {
    //     this.getLocalStorage();
    // },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        }
        //     getLocalStorage() {
        //         this.user = JSON.parse(localStorage.getItem('token'));
        //         this.fullName = this.user.firstName + ' ' + this.user.lastName;
        //         this.avatarLabel = this.user.firstName.charAt(0) + this.user.lastName.charAt(0);
        //     }
    }
}
</script>

<template>
    <div class="layout-topbar ">
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <router-link to="/course" class="layout-topbar-logo">
            <!-- <img :src="logoUrl" alt="logo" /> -->
            <span>B.E.S.T (Better Education Supported Technology)</span>
        </router-link>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu flex align-items-center" :class="topbarMenuClasses">
            <div class="hidden md:block">
                <router-link to="/notification">
                    <button class="p-link layout-topbar-button mr-2">
                        <i class="pi pi-bell"></i>
                        <span>Notification</span>
                    </button>
                </router-link>

                <Button @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
                    class="p-button-text p-button-plain px-3 py-0">
                    <div class="flex align-items-center">
                        <p class="mt-3 mr-2 text-lg text-900">{{ this.fullName }}</p>
                        <div class="border-circle flex align-items-center justify-content-center"
                            style="background-color: var(--primary-color); color: #ffffff; width: 30px; height: 30px;">
                            {{ this.avatarLabel }}
                        </div>

                    </div>
                </Button>

                <Menu class="block md:hidden" id="overlay_menu" ref="menu" :model="items" :popup="true" />
            </div>
        </div>
    </div>
</template>