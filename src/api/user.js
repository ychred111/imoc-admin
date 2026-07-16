import request from '../utils/request'

// 个人中心 - 功能
export const feature = () => {
  return request({
    url: '/user/feature'
  })
}

// 个人中心 - 章节
export const chapter = () => {
  return request({
    url: '/user/chapter'
  })
}
