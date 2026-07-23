<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
    v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="info" @click="onConfirm" :loading="loading">{{ $t('msg.excel.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n.js'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
// 导入时间格式化工具
import { dateFormat } from '@/filters'

// 定义 Props
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 定义 Emits
const emits = defineEmits(['update:modelValue'])

// 文件名处理
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

/**
 * 导出按钮点击事件
 */
// 原始数据 (allUser)
// [
//   { username: '张三', mobile: '13800138000', openTime: '2026-07-23T10:00:00', role: [{ title: '管理员' }] },
//   { username: '李四', mobile: '13800138001', openTime: '2026-07-22T09:00:00', role: [{ title: '普通用户' }] }
// ]
//         ↓ formatJson(USER_RELATIONS, allUser)
// 二维数组 (data)
// [
//   ['张三', '["管理员"]', '2026-07-23 10:00'],
//   ['李四', '["普通用户"]', '2026-07-22 09:00']
// ]
//         ↓ export_json_to_excel
// Excel 文件 ✅
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // 数据（从服务端获取）
  const allUser = (await getUserManageAllList()).list
  // console.log(allUser)
  // 通常在组件中使用动态导入，按需加载减少打包体积
  const excel = await import('@/utils/Export2Excel')
  // allUser 为从服务端获取的原始 JSON 数组
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS), // ['name', 'role', 'openTime']
    data, // 二维数组数据
    filename: excelName.value || '导出文件', // 文件名
    autoWidth: true, // 自动列宽
    bookType: 'xlsx' // 导出格式
  })
  closed()
}

/**
 * 将 JSON 数组对象转换为 Excel 所需的二维数组
 * @param {Object} headers - 映射关系对象（如 USER_RELATIONS）
 * @param {Array} rows - 原始数据数组（如 allUser）
 * @returns {Array} 二维数组，每行对应一个数据项
 */
const formatJson = (headers, rows) => {
  console.log(headers)
  console.log(rows)
  return rows.map(item => {
    // 遍历 headers 的 key，按顺序提取数据
    return Object.keys(headers).map(key => {
      // 🔹 角色特殊处理（若字段为 role，需提取角色标题）
      if (headers[key] === 'role') {
        const roles = item[headers[key]] // 获取角色数组
        return JSON.stringify(roles.map(role => role.title)) // 转为 JSON 字符串
      }

      // 🔹 时间特殊处理（在后续步骤补充）
      if (headers[key] === 'openTime') {
        return dateFormat(item[headers[key]])
      }

      // 默认直接返回值
      return item[headers[key]]
    })
  })
}

/**
 * 关闭对话框
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>
