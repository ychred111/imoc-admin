import { LANG, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) // 从 localStorage 恢复标签页
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
    addTagsViewList (state, tag) {
      console.log('🔍 添加 tag:', tag)
      if (!tag || !tag.path) {
        return
      }
      // ✅ 确保是数组
      if (!state.tagsViewList || !Array.isArray(state.tagsViewList)) {
        state.tagsViewList = []
      }
      // ✅ 过滤掉无效数据后再查找
      const validTags = state.tagsViewList.filter(item => item && item.path)

      // 检查是否已存在相同路径的标签
      const isFind = validTags.find(item => {
        return item.path === tag.path
      })
      // 处理重复 // 如果不存在，则添加
      if (!isFind) {
        state.tagsViewList.push(tag)
        // 保存到 localStorage，刷新页面后恢复
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    // 给指定的tag修改title
    changeTagsView (state, { index, tag }) {
      // console.log(state.tagsViewList)
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    // 关闭 tags 页面事件
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView (state, payload) {
      if (payload.type === 'index') {
        console.log('index')
        state.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        console.log('other')
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        console.log('right')
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  actions: {}
}
