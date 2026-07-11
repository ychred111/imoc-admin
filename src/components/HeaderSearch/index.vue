<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon class-name="search-icon" icon="search" @click.stop="onShowClick">
    </svg-icon>
     <el-select
        ref="HeaderSearchSelectRef"
        class="header-search-select"
        v-model="search"
        filterable
        default-first-option
        remote
        :remote-method="querySearch"
        @change="onSelectChange"
        placeholder="search"
      >
        <el-option
          v-for="options in 5"
          :key="options"
          :label="options"
          :value="options"
        >
        </el-option>
      </el-select>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { filterRouters, generateMenus } from '@/router/index'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from '@/compositions/HeaderSearch/FuseData'

// 被检索的页面就是左边菜单的页面，检索的数据源就是：左边菜单对应的数据源 在路由的时候有处理
const router = useRouter()

// 数据库
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  console.log(generateMenus(filterRoutes))
  return generateRoutes(filterRoutes)
})
console.log(searchPool)

// 搜索库相关
const fuse = new Fuse(searchPool.value, {
  // 配置：
  // 是否按优先级进行排序，搜索结果按匹配度从高到低排序，匹配度越高的结果排在越前面
  shouldSort: true,
  // 最小匹配字符长度，最少输入多少个字符才触发搜索，设为 1 表示输入 1 个字符就开始搜索，建议值：1-3
  minMatchCharLength: 1,
  // keys 权重配置：搜索的键及权重配置
  keys: [
    {
      name: 'title', // 搜索 title 字段
      weight: 0.7 // 权重 70%
    },
    {
      name: 'path', // 搜索 path 字段
      weight: 0.3 // 权重 30%
    }
  ]
})

// el-select 属性备注:
// filterable:可输入文字进行过滤筛选
// 默认状态（只读）：
//   [▼ 请选择]  ← 像普通下拉框
// 开启 filterable 后：
//   [🔍 输入搜索...]  ← 变成了可输入的搜索框
// 当 filterable 启用时：
// el-select 会变成一个输入框
// 你输入文字会过滤/搜索下拉选项
// 工作流程：
// 点击图标 → 添加 .show 类 → 宽度 0 → 210px（搜索框展开）
// 再次点击 → 移除 .show 类 → 宽度 210px → 0（搜索框收起）

// default-first-option:按回车时默认选中第一个匹配项
// remote:启用远程搜索，从服务器获取数据

// 1. 用户点击输入框
//    ↓
// 2. 输入搜索关键词（如 "admin"）
//    ↓
// 3. 触发 :remote-method="querySearch"
//    ↓
// 4. querySearch 发起 API 请求到服务器
//    ↓
// 5. 返回匹配的选项列表
//    ↓
// 6. 用户选择一个选项
//    ↓
// 7. 触发 @change="onSelectChange"
//    ↓
// 8. v-model="search" 自动更新为选中值

// 控制search
const isShow = ref(false)
const HeaderSearchSelectRef = ref(null)
const onShowClick = () => {
  console.log('111')
  isShow.value = !isShow.value // 切换显示/隐藏
  //   console.log('isShow:', isShow.value) // 调试：查看是否切换
  // 展开后自动聚焦
  HeaderSearchSelectRef.value.focus()
}
// 搜索方法
// 远程搜索方法，输入时触发 querySearch 函数
const search = ref('')
const querySearch = query => {
  console.log(fuse.search(query))
}

// 选中回调
// 选中选项时触发 onSelectChange 函数
const onSelectChange = () => {
  console.log('onSelectChange')
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
  }

  :deep(.el-input__inner) {
    border-radius: 0;
    border: 0;
    padding-left: 0;
    padding-right: 0;
    box-shadow: none !important;
    border-bottom: 1px solid #d9d9d9;
    vertical-align: middle;
  }
  // 显示状态：展开搜索框
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
