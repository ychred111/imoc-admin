import { LANG } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened // 切换状态
    },
    // 设置国际化
    setLanguage (state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  },
  actions: {}
}
