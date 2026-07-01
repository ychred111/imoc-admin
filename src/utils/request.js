import axios from 'axios'
import { Promise } from 'core-js'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.icode = 'helloqianduanxunlianying'
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }

)

// 响应拦截器
service.interceptors.response.use(
  response => {
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
  error => {
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  }
)

export default service
