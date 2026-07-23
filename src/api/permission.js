import request from '../utils/request'

// 获取权限列表
export const permissionList = data => {
  return request({
    url: '/permission/list'
  })
}
