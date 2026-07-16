import request from '../utils/request'

// 获取用户数据
export const getUserManageList = data => {
  return request({
    url: '/user-manage/list',
    data
  })
}
