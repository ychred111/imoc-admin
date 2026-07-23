// src/filters/index.js
import dayjs from 'dayjs'

/**
 * 日期格式化函数（简洁版）
 */
export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

/**
 * 日期格式化函数（完整版）
 */
export const dateFormat = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return '-'

  let d = date
  if (typeof date === 'string' || typeof date === 'number') {
    d = new Date(date)
  }

  if (isNaN(d.getTime())) {
    return '-'
  }

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

// 使用 export const 支持具名导入（import { dateFormat } from '@/filters'）
// 使用 export default 支持 Vue 插件注册（installFilters(app)）

// ✅ 默认导出函数（匹配 main.js 的 installFilters(app)）
export default function (app) {
  app.config.globalProperties.$filters = {
    dateFilter,
    dateFormat
  }
}
