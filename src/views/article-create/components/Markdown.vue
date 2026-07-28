<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="info" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { commitArticle } from '@/views/article-create/components/commit'
import { defineProps, defineEmits, onMounted } from 'vue'
import { useStore } from 'vuex'
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { watchSwitchLang } from '@/utils/i18n.js'

const props = defineProps({
  title: {
    type: String,
    require: true
  }
})

const emit = defineEmits(['onSuccess'])

const onSubmitClick = async () => {
  await commitArticle({
    title: props.title,
    content: mkEditor
  })
  mkEditor.reset()
  emit('onSuccess')
}

// 初始化editor
// Editor实例
let mkEditor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })

  mkEditor.getMarkdown()
}

watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHtml()
  mkEditor.destroy()
  initEditor()
  mkEditor.seHTML(htmlStr)
})

</script>
<style scoped lang='scss'>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
