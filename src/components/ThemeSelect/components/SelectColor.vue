<template>
  <el-dialog title="提示" :model-value="modelValue" @close="closed" width="22%">
    <div class="center">
      <p>{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
         <el-button  @click="comfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// ============================================================
// 组件：主题色选择器（SelectColor.vue）
// 功能：用户选择主色后，调用 theme 工具类动态切换主题
// ============================================================
// 导入主题切换工具方法
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'

import { generateNewStyle, writeNewStyle } from '@/utils/theme'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

const store = useStore()
// 默认色值
// const mColor = ref(store.getters.mainColor)
const mColor = ref(store.getters.mainColor)
// 关闭
const closed = () => {
  emit('update:modelValue', false)
}
// 确认
const comfirm = async () => {
  // 获取主题色
  const newStyleText = await generateNewStyle(mColor.value)
  //   写入最新主题色
  writeNewStyle(newStyleText)
  //   保存最新主题色
  store.commit('theme/setMainColor', mColor.value)
  // 关闭弹窗
  closed()
}

</script>
<style scoped lang="scss">
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
