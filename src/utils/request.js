import axios from 'axios'
const service = axios.crteate({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

export default service
