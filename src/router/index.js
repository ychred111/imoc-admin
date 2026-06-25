import { createRouter, createWebHashHistory } from 'vue-router'

const routers = [
  {
    path: '/login',
    component: () => import('@/views/login/LoginIndex.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routers
})

export default router
