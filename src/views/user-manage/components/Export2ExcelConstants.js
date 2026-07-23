/**
 * 导入数据对应表
 * key：Excel 表头显示的中文名（或字段别名）
 * value：数据源对象中对应的实际字段名
 */
export const USER_RELATIONS = {
  name: 'username', // Excel列名"name" → 数据字段"username"
  role: 'mobile', // Excel列名"role" → 数据字段"mobile"
  openTime: 'openTime' // Excel列名"openTime" → 数据字段"openTime"
}
