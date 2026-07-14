import i18n from '@/i8n'
import { watch } from 'vue'
import store from '@/store'

export function generateTitle (title) {
  // return i18n.global.t('msg.route.' + title)
  // ✅ 如果 title 不存在，返回空字符串或默认值
  if (!title) {
    console.warn('generateTitle: title is undefined')
    return ''
  }
  return i18n.global.t('msg.route.' + title) || title
}

export function watchSwitchLang (...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach(cb => cb(store.getters.language))
    }
  )
}
