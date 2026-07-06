<template>
 <div class="hamburger-container" @click="toggleClick">
     <svg-icon class="hamburger" :icon="icon" className="hamburger-icon"></svg-icon>
 </div>

</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const toggleClick = () => {
  console.log('store:', store) // 调试：打印 store
  console.log('store.state.app:', store.state.app) // 调试：打印 app 模块
  store.commit('app/triggerSidebarOpened') // ← 提交 mutation
}

const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})

</script>
<style scoped lang="scss">
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
