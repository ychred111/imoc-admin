<template>
  <el-breadcrumb class="breadcrumbs" separator="/">
    <transition-group name="breadcrumb">
      <!-- 遍历 breadcrumbData 数组，渲染每个面包屑项。index 用于判断是否是最后一项。 -->
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbsData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbsData.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <!-- 可点击项 -->
        <a href="#" v-else class="redirect" @click.prevent="onClick(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

// 用户访问页面 → 路由变化 → 自动更新面包屑数据 → 展示在导航栏
const route = useRoute()
// 生成数组数据
const breadcrumbsData = ref([])
const getDreadcrumbsData = () => {
  // 获取所有匹配的路由 -》 过滤保留有 meta.title 的项 -》存于breadcrumbsData
  breadcrumbsData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
  console.log(breadcrumbsData.value)
}

const onClick = (item) => {
  console.log(item)
  router.push(item.path)
}

const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)

watch(
  route,
  () => {
    getDreadcrumbsData()
  },
  { immediate: true } // 立即执行一次
)
</script>
<style scoped lang="scss">
.breadcrumbs {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect:hover {
    color: v-bind(linkHoverColor); // 悬停颜色从 Vuex 获取
  }
}
</style>
