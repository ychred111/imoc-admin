import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/LoginIndex.vue')
  },
  {
    path: '/',
    redirect: '/login' // 根路径重定向到登录页
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
