<script setup>
import axios from 'axios'
import { ref, watch, onMounted } from 'vue'
import AppMenuItem from './AppMenuItem.vue';


let user = {
    id: 6,
};

// const listEnroll = onMounted(async () => {
//     try {
//         const res = await axios.get('http://localhost:8080/api/enrollment/getEnroll', {
//             params: {
//                 id: user.id
//             }
//         })
//         localStorage.setItem('myCourse', JSON.stringify(res.data));
//     } catch (error) {
//         console.log(error)
//     }
// });

let myCourse = JSON.parse(localStorage.getItem('myCourse')) || [];
myCourse = myCourse.map((course) => {
    return {
        label: course.course.title,
        icon: 'pi pi-fw pi-book',
        to: '/course_detail/' + course.courseId,
    };
});

watch(() => JSON.parse(localStorage.getItem('myCourse')), (newVal) => {
    myCourse = newVal.map((course) => {
        return {
            label: course.title,
            icon: 'pi pi-fw pi-book',
            to: '/course_detail/' + course.courseId,
        };
    });
});

const model = ref([
    {
        label: 'หน้า',
        items: [
            { label: 'คอร์สเรียน', icon: 'pi pi-fw pi-book', to: '/course' },
            { label: 'ปฏิทิน', icon: 'pi pi-fw pi-calendar', to: '/calendar', },
            { label: 'งานที่ได้รับมอบหมาย', icon: 'pi pi-fw pi-file', to: '/assignment' },
            { label: 'แชท', icon: 'pi pi-fw pi-comments', to: '/chat' },
            // { label: 'Setting', icon: 'pi pi-fw pi-cog', to: '/setting' },
            // { label: 'User Manage', icon: 'pi pi-fw pi-user-edit', to: '/manage' },
            {
                label: 'คอร์สของฉัน', icon: 'pi pi-fw pi-book', to: '/course_detail', items: myCourse
            },
        ]
    },
]);

const assistant = ref([
    {
        items: [
            { label: 'เกี่ยวกับโปรแกรมนี้', icon: 'pi pi-fw pi-verified', to: '/about' },
            { label: 'ทีมพัฒนา', icon: 'pi pi-fw pi-users', to: '/team', },
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

<style></style>