import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Signin.vue')
    },
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
      path: '/course',
      name: 'course',
      component: () => import('../views/Course.vue')
    },
    {
      path: '/course/:id',
      name: 'course-detail',
    },
    {
      path: '/course/:id/participants',
      name: 'course-participants',
    },
    {
      path: '/course/:id/files',
      name: 'course-files',
    },
    {
      path: '/course/:id/assignments',
      name: 'course-assignments',
    },
    {
      path: '/course/:id/assignments/:id',
      name: 'course-assignment-detail',
    },
    {
      path: '/chat/:id',
      name: 'chat-detail',
    },
  ]
})

export default router
