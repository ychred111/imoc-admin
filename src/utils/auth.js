// 登录成功
//     ↓
// 保存 token 到 localStorage + Vuex
//     ↓
// 保存当前时间戳到 localStorage  ← 记录登录时间
//     ↓
// 用户操作 → 发送请求
//     ↓
// 请求拦截器检查
//     ↓
// 计算：当前时间 - 登录时间 > 2小时？
//     ↓
// 是 → token 超时 → 自动退出登录 → 跳转登录页
// 否 → 正常发送请求

import { getItem, setItem } from './storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'

// 获取时间戳
export function getTimeStamp () {
  return getItem(TIME_STAMP)
}
// 设置时间戳
export function setTimeStamp () {
  setItem(TIME_STAMP, Date.now()) // 存当前时间
}
// 是否超时
export function isCheckTimeOut () {
  // 当前时间戳 - 缓存时间戳 是否大于 token的超时时间
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
