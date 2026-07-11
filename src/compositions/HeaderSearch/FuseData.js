// 将路由表转换成可供搜索的列表数据，用于顶栏全局搜索功能。

// 输入：Vue Router 的路由表
// 输出：包含 path 和 title 的可搜索数据数组

// 1. 遍历路由--逐个处理路由表
// 2. 拼接路径--生成完整 URL 路径
// 3. 复制标题--保留父级标题用于层级显示
// 4. 过滤动态路由--排除带 : 的动态路由
// 5. 处理国际化--将 meta.title 翻译成显示文本
// 6. 递归子路由--处理多级嵌套路由
// 7. 返回结果--生成可供搜索的列表
// 核心思想： 将树形结构的路由表，转换成扁平化的可搜索列表，并保留层级关系用于显示。

import path from 'path-browserify'
// import i18n from '@i18n'
import i18n from '@/i8n/index'

/**
 * 筛选出可供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径，默认为 /
 * @param prefixTitle
 */

// routes 无 当前要处理的路由表（数组）
// basePath '/' 父级路径，用于拼接完整路径
// prefixTitle [] 父级标题数组，用于构建层级标题
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let res = []
  // 循环 routes 路由
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    // 匹配动态路由的正则
    const re = /.*:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      res.push(data)
    }

    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
