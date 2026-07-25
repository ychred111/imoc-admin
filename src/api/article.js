import request from '../utils/request'

// 获取权限列表
export const articleList = data => {
  return request({
    url: '/article/list',
    params: data
  })
}
