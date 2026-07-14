import { LANG, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || [] // 从 localStorage 恢复标签页
  }),
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened // 切换状态
    },
    // 设置国际化
    setLanguage (state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    // 添加tags 添加标签页
    addtagsViewList (state, tag) {
      // ✅ 确保 tagsViewList 是数组
      if (!state.tagsViewList || !Array.isArray(state.tagsViewList)) {
        state.tagsViewList = []
      }
      // 检查是否已存在相同路径的标签
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      // 处理重复 // 如果不存在，则添加
      if (!isFind) {
        state.tagsViewList.push(tag)
        // 保存到 localStorage，刷新页面后恢复
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    }
  },
  actions: {}
}
