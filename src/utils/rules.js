import i18n from '@/i8n'

export const validatorPassword = () => {
  return (rules, values, callback) => {
    if (values.length < 6) {
      callback(new Error(i18n.global.t('msg.login.password')))
    } else {
      callback()
    }
  }
}
