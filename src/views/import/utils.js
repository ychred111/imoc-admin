// 字段映射关系 因为上传的数据与后端接口要求的字段不一样 所以要转化一下
export const USER_RELATIONS = {
  name: 'username', // Excel中的"姓名" → 接口的"username"
  mobile: 'mobile', // Excel中的"手机号" → 接口的"mobile"
  role: 'role', // Excel中的"角色" → 接口的"role"
  openTime: 'openTime' // Excel中的"开通时间" → 接口的"openTime"
}

/**
 * 解析 excel 导入的时间格式
 */
export const formatDate = numb => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}
