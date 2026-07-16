import dayjs from 'dayjs'

const dateFilter = (val, format = 'YYYY-MM-DD') => {
// 如果 val 不是 NaN（数字），转为整数
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  // 使用 dayjs 格式化日期
  return dayjs(val).format(format)
}

// 导出一个函数，接收 app 实例
export default app => {
  // Vue 3 的全局属性（相当于 Vue 2 的 Vue.prototype）
  // $filters 挂载到全局的属性名
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
