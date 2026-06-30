import axios from 'axios'
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

export default service
