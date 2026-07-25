import request from '../utils/request'

// 获取角色列表
export const roleList = data => {
  return request({
    url: '/role/list'
  })
}

// 获取角色权限
export const rolePermission = roleId => {
  return request({
    url: `/role/permission/${roleId}`
  })
}
