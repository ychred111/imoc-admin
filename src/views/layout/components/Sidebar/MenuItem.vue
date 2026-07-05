<template>
  <!-- # 菜单标题渲染组件（图标+文字） -->
  <i v-if="icon.includes('el-icon')" class='su-el-icon' :class="icon"></i>
  <svg-icon v-else :icon="icon" className="menu-icon"></svg-icon>
  <span>{{ title }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>
<style scoped lang="less"></style>
