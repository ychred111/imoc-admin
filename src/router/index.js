import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/LayoutIndex.vue') // 根路径重定向
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginIndex.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
