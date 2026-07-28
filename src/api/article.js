import request from '../utils/request'

// 获取权限列表
export const articleList = data => {
  return request({
    url: '/article/list',
    params: data
  })
}

/**
 * 修改排序
 */
export const articleSort = data => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}
