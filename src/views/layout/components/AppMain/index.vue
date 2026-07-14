<template>
 <div class="app-main">
  <router-view>
  </router-view>
 </div>
</template>

<script setup>
// export default {
//   name: 'AppMain'
// }
// import { watch } from 'vue'
import { isTags } from '@/utils/tags'
import { useRoute } from 'vue-router'
import { generateTitle } from '@/utils/i18n'
import { watch } from 'vue'
import { useStore } from 'vuex'
// 用户点击菜单/切换路由
//         ↓
// 路由变化触发 watch
//         ↓
// 检查 isTags() 是否在白名单
//         ↓
//    否 → 不处理
//         ↓
//    是 → 生成标题 (generateTitle)
//         ↓
// 提交 Vuex mutation (addtagsViewList)
//         ↓
// 检查 tagsViewList 中是否已存在
//         ↓
//    是 → 不添加（去重）
//         ↓
//    否 → 添加到列表
//         ↓
// 保存到 localStorage
//         ↓
// 顶部 TagsView 组件自动更新显示

const route = useRoute()

// 生成title
// 在 AppMain/index.vue 中添加
const getTitle = route => {
  let title = ''

  // console.log('🔍 ===== 开始验证 =====')
  // console.log('🔍 route:', route)
  // console.log('🔍 route.meta:', route.meta)

  if (!route.meta) {
    // console.log('🔍 进入无 meta 分支')
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
    // console.log('🔍 从路径提取的 title:', title)
  } else {
    // console.log('🔍 进入有 meta 分支')
    // console.log('🔍 route.meta.title:', route.meta.title)
    title = generateTitle(route.meta.title)
    // console.log('🔍 generateTitle 返回值:', title)
    // console.log('🔍 title 类型:', typeof title)
  }

  // console.log('🔍 最终返回的 title:', title)
  // console.log('🔍 ===== 验证结束 =====')

  return title
}

const store = useStore()
// 监听路由变化 监听语言切换，刷新所有标签页标题
watch(
  route,
  (to, from) => {
    // 检查是否在白名单中
    if (!isTags(to.path)) return
    // 收集路由信息
    const { fullPath, meta, name, params, path, query } = to
    // 提交到 Vuex，添加标签页
    store.commit('app/addtagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  }, {
    immediate: true
  }
)

</script>
<style scoped lang='scss'>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
