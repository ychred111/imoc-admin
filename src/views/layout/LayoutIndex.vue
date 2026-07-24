<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左边 meun -->
    <sidebar  class="sidebar-container" id="guide-sidebar" :style="{backgroundColor: $store.getters.cssVar.menuBg}"> </sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 Navbar-->
        <navbar></navbar>
        <!-- tags -->
         <tags-view id="guide-tags"></tags-view>
      </div>
      <!-- 内容区域 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar/index'
import AppMain from './components/AppMain/index'
import Sidebar from './components/Sidebar/index'
import TagsView from '@/components/TagsView/index.vue'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
// @import '~@/style/sidebar.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
  // transition: width  0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}

.sidebar-container {
  background-color: gray;
}
</style>
