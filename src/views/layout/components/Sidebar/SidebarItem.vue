<template>
  <!-- # 菜单项递归组件（处理子菜单/菜单项） -->
  <!-- 根据数据处理当前项是 el-submenu 还是 el-menu-item -->
  <!-- 有子路由 =》 el-submenu -->
  <!-- 无子路由 =》 el-menu-item -->
  <!-- route.children.length > 0 ? el-submenu ： el-menu-item -->

  <!-- 支持渲染多级menu菜单 -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染 -->
     <sidebar-item v-for="item in route.children" :key="item.path" :route="item"></sidebar-item>
  </el-sub-menu>

  <!-- 渲染item -->
  <el-menu-item v-else :index="route.path">
     <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem'

// 定义props
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
<style scoped lang="less"></style>
