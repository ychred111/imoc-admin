// 存储数据
export const setItem = (key, value) => {
  // 基本类型数据
  // 复杂类型数据
  // 判断数据类型，复杂类型的数据转化为JSON字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key, value) => {
  const data = window.localStorage.getItem(key, value)
  // 将所有的数据转化成字符串
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}

// 删除所有数据
export const removeAllItem = key => {
  window.localStorage.clear(key)
}
