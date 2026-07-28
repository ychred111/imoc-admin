<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLable">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :value="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >

        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef"  :data="totalData" border>
        <el-table-column
          v-for="(item, index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>

          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button
              :prop="action"
              type="info"
              size="small"
              @click="onShowClick(row)"
            >
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
        <!-- 按钮 -->
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { articleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { dynamicData, selectDynamicLable, tableColumn } from './dynamic/index'
import { tableRef, initSortable } from './sortable/index'

const page = ref(1)
const size = ref(10)
const total = ref(1)
const totalData = ref([])

const getArticleList = async (data) => {
  const result = await articleList({
    page: page.value,
    size: size.value
  })
  totalData.value = result.list
  total.value = result.total
  console.log(result)
}
getArticleList()
watchSwitchLang(getArticleList)

onMounted(() => {
  initSortable(tableRef, getArticleList)
})

/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getArticleList()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getArticleList()
}

</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }

}

::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
