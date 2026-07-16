import axios from 'axios'
import { Promise } from 'core-js'
import { ElMessage } from 'element-plus'
import store from '@/store/index' // 导入 Vuex store，用来获取 token
import { isCheckTimeOut } from '@/utils/auth'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
// Axios 请求拦截器，在每次发送请求前自动把 token 添加到请求头中
// 发送请求
//     ↓
// 请求拦截器拦截
//     ↓
// 检查 store 中是否有 token
//     ↓
// 有 token → 添加到请求头 Authorization: Bearer xxx
//     ↓
// 没有 token → 不添加
//     ↓
// 发送请求到后端
//     ↓
// 后端验证 token
//     ↓
// 返回数据
service.interceptors.request.use(
  // 请求发送之前处理函数
  (config) => {
    // 注入 icode（固定值，用于平台标识）
    config.headers.icode = 'helloqianduanxunlianying'
    // 在这个位置统一注入token
    // 从 store 的 getters 中获取 token
    if (store.getters.token) {
      // 判断token是否超时
      if (isCheckTimeOut()) {
        // 登出
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      // 如果 token 存在，添加到请求头中
      // Bearer 是标准的 token 认证方式
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口数据国际化
    config.headers['Accept-Language'] = store.getters.language
    // 必须返回配置，否则请求无法继续
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    // 判断当前请求是否成功
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败（请求成功，业务失败），消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  (error) => {
    // token 过期登出
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user.logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  }
)

export default service
