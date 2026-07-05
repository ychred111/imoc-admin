  <template>
     <!-- # 顶层菜单容器 -->
  <!-- 一级 menu 菜单 -->
  <el-menu
    :unique-opened="true"
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >

  <sidebar-item v-for="item in routes" :key="item.path" :route="item"> </sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/router/index'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRouters(router.getRoutes())
  return generateMenus(fRoutes)
})
console.log(JSON.stringify(routes.value))

</script>
<style scoped lang="less"></style>
