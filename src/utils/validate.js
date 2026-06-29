/**
 * 导出一个判断是否是外部资源的方法
 * 判断是否为外部资源
 * @param {*} path - 资源路径
 */

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
