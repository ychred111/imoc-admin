<template>
  <div>
    <!-- 🌐 语言 -->
    <el-dropdown
      trigger="click"
      class="international"
      @command="handleSetLanguage"
    >
      <div>
        <el-tooltip :effect="effect" :content="$t('msg.navBar.lang')">
          <span>
          <svg-icon focusable="false" style="font-size: 24px; margin-top: 5px;" icon="language"></svg-icon>
          </span>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="language === 'zh'" command="zh"
            >中文</el-dropdown-item
          >
          <el-dropdown-item :disabled="language === 'en'" command="en"
            >English </el-dropdown-item
          >
        </el-dropdown-menu>
      </template>

    </el-dropdown>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const store = useStore()
const language = computed(() => store.getters.language)

const i18n = useI18n()
// 切换 语言
const handleSetLanguage = lang => {
  console.log('点击切换的语言:', lang)
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  console.log('store 中的 language:', store.getters.language)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
<style scoped lang="less"></style>
