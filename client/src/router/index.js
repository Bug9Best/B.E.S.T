import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/',
      name: 'home',
      component: AppLayout,
      children: [
        {
          path: 'course',
          name: 'course',
          component: () => import('../views/Course.vue')
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: () => import('../views/Calendar.vue')
        },
        {
          path: 'assignment',
          name: 'assignment',
          component: () => import('../views/Assignment.vue')
        },
        {
          path: 'chat',
          name: 'chat',
          component: () => import('../views/Chat.vue')
        },
        {
          path: 'notification',
          name: 'notification',
          component: () => import('../views/Notification.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/Profile.vue')
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import('../views/Setting.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/About.vue')
        },
        {
          path: '/team',
          name: 'team',
          component: () => import('../views/Team.vue')
        },
        {
          path: '/course_detail/:id',
          name: 'course_detail',
          component: () => import('../views/CourseDetail.vue'),
          props: true
        },
      ]
    },
  ]
})

export default router
