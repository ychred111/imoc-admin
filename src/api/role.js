import request from '../utils/request'

// 获取角色列表
export const roleList = data => {
  return request({
    url: '/role/list'
  })
}
