<template>
  <!-- # 顶层菜单容器 -->
  <!-- 一级 menu 菜单 -->
  <el-menu
    :default-active="activeMenu"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
    :collapse="!$store.getters.sidebarOpened"
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item">
    </sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/router/index'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRouters(router.getRoutes())
  return generateMenus(fRoutes)
})
// console.log(JSON.stringify(routes.value))

// 高亮 menu
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
<style scoped lang="less"></style>
