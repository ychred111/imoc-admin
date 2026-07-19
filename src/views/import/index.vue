<template>
<upload-excel :onSuccess="onSuccess" :beforeUpload="beforeUpload"></upload-excel>
</template>

<script setup>
import { } from 'vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()

// Excel 解析完成 (onSuccess)
//     ↓
// 获取 { header, results }
//     ↓
// generateData(results) 转换数据结构
//     ↓
// 调用 userBatchImport(updateData) 上传
//     ↓
// 显示成功消息
//     ↓
// 跳转到用户管理页面

// 将 Excel 数据转换为接口要求的格式
const generateData = results => {
  const arr = [] // 存储转换后的数据

  results.forEach(item => { // 遍历每行数据
    const userInfo = {} // 创建新对象

    Object.keys(item).forEach(key => { // 遍历每行的所有字段
      // excel 的时间处理方式需要处理
      if (userInfo[USER_RELATIONS[key]] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      // 将中文键名映射为英文字段名，并保留值
      userInfo[USER_RELATIONS[key]] = item[key]
    })

    arr.push(userInfo) // 添加到结果数组
  })

  return arr
}

// 完成数据上传
const onSuccess = async ({ header, results }) => {
  // 1. 转换数据格式
  const updateData = generateData(results)

  // 2. 调用上传接口
  await userBatchImport(updateData)
  console.log(updateData)

  // 3. 显示成功消息
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })

  // 4. 跳转到用户管理页面
  router.push('/user/manage')
}

//
const beforeUpload = (file) => {
  // 校验：文件大小不能超过 5MB
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('文件不能超过 5MB')
    return false
  }
  return true
}

</script>

<style lang="scss" scoped></style>
