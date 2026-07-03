// 用户访问页面
//     ↓
// 检查是否有 token
//     ↓
// 有 token ────→ 已登录
//     │              ├── 去登录页 → 跳转首页
//     │              └── 去其他页 → 放行
//     ↓
// 无 token ────→ 未登录
//     │              ├── 在白名单 → 放行
//     │              └── 不在白名单 → 跳转登录页

import router from './router'
import store from './store/index.js'

// 白名单
const whiteList = ['/login']

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 已经登录，不去login
  // 没登录，只能去login
//   if (store.state.user.token) {
  if (store.getter.token) {
    if (to.path === '/login') {
      next('./')
    } else {
      next()
    }
  } else {
    //   没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  return false
})
