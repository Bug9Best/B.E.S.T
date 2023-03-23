<script setup>
import { ref, watch } from 'vue'
import AppMenuItem from './AppMenuItem.vue';

let myCourse = JSON.parse(localStorage.getItem('myCourse')) || [];
myCourse = myCourse.map((course) => {
    return {
        label: course.title,
        icon: 'pi pi-fw pi-book',
        to: '/course_detail/' + course.id,
    };
});
watch(() => JSON.parse(localStorage.getItem('myCourse')), (newVal) => {
    myCourse = newVal.map((course) => {
        return {
            label: course.title,
            icon: 'pi pi-fw pi-book',
            to: '/course_detail/' + course.id,
        };
    });
});

const model = ref([
    {
        label: 'Pages',
        items: [
            { label: 'Course', icon: 'pi pi-fw pi-book', to: '/course' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar', to: '/calendar', },
            { label: 'Assignment', icon: 'pi pi-fw pi-file', to: '/assignment' },
            { label: 'Chat', icon: 'pi pi-fw pi-comments', to: '/chat' },
            // { label: 'Setting', icon: 'pi pi-fw pi-cog', to: '/setting' },
            // { label: 'User Manage', icon: 'pi pi-fw pi-user-edit', to: '/manage' },
            {
                label: 'My Course', icon: 'pi pi-fw pi-book', to: '/course_detail', items: myCourse
            },
        ]
    },
]);

const assistant = ref([
    {
        items: [
            { label: 'About This Program', icon: 'pi pi-fw pi-verified', to: '/about' },
            { label: 'Devloper Team', icon: 'pi pi-fw pi-users', to: '/team', },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu flex flex-column flex-grow-0 flex-shrink-1">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
    <ul class="layout-menu flex flex-column flex-grow-0 flex-shrink-1 absolute bottom-0 mb-3">
        <template v-for="(item, i) in assistant" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
            <div style="width: 260px;"></div>
        </template>
    </ul>
</template>

<style>
</style>