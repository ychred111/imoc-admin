<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      >
      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'

const activeName = ref('markdown')
const title = ref('')

// 创建成功
const onSuccess = () => {
  title.value = ''
}

// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}
if (articleId) {
  getArticleDetail()
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}

/* 给当前激活的 tab 添加样式 */
:deep(.el-tabs__item.is-active) {
  color: #409eff !important;
  font-weight: 600;
}

/* 也可以添加下划线动画颜色 */
:deep(.el-tabs__active-bar) {
  background-color: #409eff;
}

/* 如果 tab 需要背景色 */
// :deep(.el-tabs__item.is-active) {
//   background: rgba(64, 158, 255, 0.1);
//   border-radius: 4px 4px 0 0;
// }

/* 鼠标悬停效果 */
// :deep(.el-tabs__item:hover) {
//   color: #409eff;
// }
</style>
