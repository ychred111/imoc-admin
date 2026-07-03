<template>
  <div class="app-wrapper">
    <!-- 左边 meun -->
    <sidebar class="sidebar-container" id="guied-sidebar" :style="{backgroundColor: variables.menuBg}"> </sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 Navbar-->
        <navbar></navbar>
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
import variables from '@/styles/variables.scss'
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
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}

.sidebar-container {
  background-color: pink;
}
</style>
