import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router'
import UserManageRouter from './modules/UserManage'
import RoleListRouter from './modules/RoleList'
import PermissionListRouter from './modules/PermissionList'
import ArticleRouter from './modules/Article'
import ArticleCreaterRouter from './modules/ArticleCreate'
// import store from '@/store'
import layout from '@/views/layout/LayoutIndex.vue'
import path from 'path-browserify'
import store from '@/store/index'

// 私有路由表
/**
 * 私有路由表
 */
export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreaterRouter
]
// console.log(privateRoutes)

// 公开路由表
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/LoginIndex.vue')
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

/**
 * 初始化路由表
 */
export function resetRouter () {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes]
})

// 流程：
// router.getRoutes()
//      ↓
//  filterRouters()  ← 过滤掉重复/多余的路由
//      ↓
//  generateMenus()  ← 生成菜单结构
//      ↓
//  SidebarMenu.vue  ← 渲染侧边栏菜单

// 返回所有的子路由
// 从路由表中提取所有子路由
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
// 过滤掉"既是父路由又是子路由"的路由，避免菜单重复
export const filterRouters = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull (data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes 数据，返回对应 menu 规则数组
 *
 */
// 递归遍历路由
// 拼接完整路径
// 只保留有 icon 和 title 的路由
// 返回可用于渲染菜单的结构
export function generateMenus (routes, basePath = '') {
  const result = []
  // 遍历路由表
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        // ...item,
        // path: routePath,
        // children: []
        path: routePath,
        meta: item.meta || {},
        children: []
      }
    }
    // icon 与 title 必须全部存在
    if (route.meta.icon && route.meta.title) {
      // meta 存在生成 route 对象，放入 arr
      result.push(route)
    }
    // 存在 children 进入迭代到 children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

export default router
