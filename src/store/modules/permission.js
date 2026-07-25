// 专门处理权限路由的模块
import { publicRoutes, privateRoutes } from '@/router'
// import layout from '@/views/layout/LayoutIndex.vue'
export default {
  namespaced: true,
  state: {
    // 路由表：初始化拥有静态路由权限
    routes: publicRoutes
  },
  mutations: {
    //   增加路由
    setRoutes (state, newRoutes) {
      //   永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    //   根据权限筛选路由
    // 在此之前要修改权限页面的name跟用户角色的权限数据的name一致
    // filterRoutes (context, menus) {
    //   if (!menus || !Array.isArray(menus)) {
    //     console.warn('⚠️ menus 为空或不是数组，使用空路由列表')
    //     context.commit('setRoutes', [])
    //     return []
    //   }

    //   //   路由匹配
    //   const routes = []
    //   //   权限名 跟 路由名 匹配
    //   menus.forEach(key => {
    //     routes.push(...privateRoutes.filter(item => item.name === key))
    //   })

    //   //   最后添加
    //   routes.push({
    //     path: '/:catchAll(.*)',
    //     redirect: '/404'
    //   })

    //   //   提交 mutations =》setRoutes
    //   context.commit('setRoutes', routes)
    //   return routes
    // }

    // src/store/modules/permission.js
    // filterRoutes (context, menus) {
    //   if (!menus || !Array.isArray(menus)) {
    //     context.commit('setRoutes', [])
    //     return []
    //   }

    //   // 按父路径分组
    //   const routeMap = {}

    //   menus.forEach(key => {
    //     const matched = privateRoutes.filter(item => item.name === key)
    //     matched.forEach(route => {
    //       // 提取父路径（如 /user/manage → /user）
    //       const parentPath = route.path.split('/').slice(0, 2).join('/')
    //       if (!routeMap[parentPath]) {
    //         routeMap[parentPath] = {
    //           path: parentPath,
    //           component: layout,
    //           children: []
    //         }
    //       }
    //       // 将完整路径改为子路径
    //       routeMap[parentPath].children.push({
    //         ...route,
    //         path: route.path.replace(parentPath + '/', '')
    //       })
    //     })
    //   })

    //   const routes = Object.values(routeMap)
    //   routes.push({
    //     path: '/:catchAll(.*)',
    //     redirect: '/404'
    //   })

    //   context.commit('setRoutes', routes)
    //   return routes
    // }

    filterRoutes (context, menus) {
      if (!menus || !Array.isArray(menus)) {
        context.commit('setRoutes', [])
        return []
      }

      const routes = []
      menus.forEach(key => {
        const matched = privateRoutes.filter(item => item.name === key)
        routes.push(...matched)
      })

      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)
      return routes
    }
  }
}
