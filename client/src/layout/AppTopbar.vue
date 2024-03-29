<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLayout } from '@/layout/composables/layout'
import { useRouter } from 'vue-router'

const { layoutConfig, onMenuToggle, contextPath } = useLayout()

const outsideClickListener = ref(null)
const topbarMenuActive = ref(false)
const router = useRouter()

onMounted(() => {
  bindOutsideClickListener()
})

onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

const logoUrl = computed(() => {
  return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'
    }.svg`
})

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value
}

const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  }
})

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return

  const sidebarEl = document.querySelector('.layout-topbar-menu')
  const topbarEl = document.querySelector('.layout-topbar-menu-button')

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  )
}
</script>

<script>
export default {
  data() {
    return {
      user: null,
      fullname: null,
      avatarLabel: null,
      items: [
        {
          label: 'หัวข้อ',
          items: [
            {
              label: 'ลงชื่อออก',
              icon: 'pi pi-sign-out',
              command: () => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                this.$router.push('/signin')
              }
            }
          ]
        }
      ]
    }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.user = user
      this.fullname = this.user.fullname
      this.avatarLabel = this.user.fullname
        .split(' ')
        .map((n) => n[0])
        .join('')
    }
  },

  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  }
}
</script>

<template>
  <div class="layout-topbar justify-content-between">
    <div class="flex align-items-center">
      <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
        <i class="pi pi-bars"></i>
      </button>

      <router-link to="/course" class="layout-topbar-logo hidden md:block">
        <!-- <img :src="logoUrl" alt="logo" /> -->
        <span>B.E.S.T (Better Education Supported Technology)</span>
      </router-link>
    </div>

    <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div>
      <Button @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
        class="p-button-text p-button-plain px-3 py-0">
        <div class="flex align-items-center">
          <p class="mt-3 mr-2 text-lg text-900">{{ fullname }}</p>
          <div class="border-circle flex align-items-center justify-content-center" style="
                background-color: var(--primary-color);
                color: #ffffff;
                width: 30px;
                height: 30px;
              ">
            {{ avatarLabel }}
          </div>
        </div>
      </Button>
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
  </div>
</template>
