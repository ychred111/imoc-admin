// 不生成标签页的路由白名单
const whileList = ['/login', '/import', '/404', '/401']

export function isTags (path) {
  return !whileList.includes(path)
}
