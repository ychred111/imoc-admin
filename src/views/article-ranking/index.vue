<template>
  <div class="article-ranking-container">
    <e-card>
      <el-table ref="totalRef" :data="totalData" border>
        <el-table-column
          prop="ranking"
          :label="$t('msg.article.ranking')"
          width="width"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          :label="$t('msg.article.title')"
          width="width"
        >
        </el-table-column>
        <el-table-column
          prop="author"
          :label="$t('msg.article.author')"
          width="width"
        >
        </el-table-column>
        <el-table-column
          prop="publicDate"
          :label="$t('msg.article.publicDate')"
          width="width"
        >
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          :label="$t('msg.article.desc')"
          width="width"
        >
        </el-table-column>
        <!-- 按钮 -->
        <el-table-column
          prop="desc"
          :label="$t('msg.article.desc')"
          width="width"
        >
          <el-button type="info" size="small" @click="onShowClick(row)">
            {{ $t('msg.article.show') }}
          </el-button>
          <el-button type="danger" size="small" @click="onRemoveClick(row)">
            {{ $t('msg.article.remove') }}
          </el-button>
        </el-table-column>
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
    </e-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { articleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
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
