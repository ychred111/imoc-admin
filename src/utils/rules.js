export const validatorPassword = () => {
  return (rules, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码不能小于6位数'))
    } else {
      callback()
    }
  }
}
