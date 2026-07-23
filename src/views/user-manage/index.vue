<template>
  <div class="user-manage-container">
    <!-- 结构 两个卡片上下排布  -->
    <!-- 卡片1   导入导出按钮-->
    <el-card class="haeder">
      <div>
        <el-button type="info" @click="onImportExcelClick">{{ $t('msg.excel.importExcel') }}</el-button>
        <el-button type="success" @click="onTExcelClick" >{{ $t('msg.excel.exportExcel') }}</el-button>
      </div>
    </el-card>

    <!-- 卡片2 table 7列 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column label="#" type="index"> </el-table-column>

        <!-- 姓名 -->
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>

        <!-- 手机 -->
        <el-table-column :label="$t('msg.excel.mobile')" prop="mobile">
        </el-table-column>

        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image :src="row.avatar" class="avatar"></el-image>
          </template>
        </el-table-column>

        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              {{ $t('msg.excel.defaultRole') }}
            </div>
          </template>
        </el-table-column>

        <!-- 时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button
              type="warning"
              size="small"
              @click="onShowClick(row._id)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button type="info" size="small" @click="onShowClick(row._id)">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button
              type="danger"
              size="small"
              @click="onRemoveClick(row)"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { ElMessageBox, ElMessage } from 'element-plus'

// 页面加载
//     ↓
// getListData() 执行
//     ↓
// 调用接口 getUserManageList({ page: 1, size: 2 })
// page size 是后端规定要传递参数 意思是：分页查询时，前端需要告诉后端 要第几页page 每页要多少条size
//     ↓
// 后端返回数据：
//     {
//       list: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }],
//       total: 100
//     }
//     ↓
// 赋值：
//     tableData.value = res.list   →  表格显示 2 条数据
//     total.value = res.total      →  分页显示 "共 100 条"
// 数据相关
const total = ref(0) // 总数据条数
const page = ref(1) // 当前页码
const size = ref(2) // 每页显示条数
const tableData = ref([]) // 表格数据列表

const getListData = async () => {
  const res = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = res.list
  total.value = res.total

  console.log(res)
}

getListData()

watchSwitchLang(getListData)
onActivated(getListData)

const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// 导入
const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

// 删除用户
const i18n = useI18n()
const onRemoveClick = row => {
  // 删除前提示
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }

  ).then(async () => { // 点击确认之后进入 .then
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}

</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 2px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
