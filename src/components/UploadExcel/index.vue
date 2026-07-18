<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="info" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import XLSX from 'xlsx'
import { defineProps, ref } from 'vue'
import { getHeaderRow } from './utils'
// 用户点击上传 →
// 选择 .xlsx/.xls 文件 →
// 可选的前置校验 (beforeUpload) →
// 使用 FileReader 读取文件 →
// 用 xlsx 解析成 JSON →
// 通过 onSuccess 回调把数据传给父组件
// beforeUpload上传前钩子，可做文件校验（格式、大小等），返回 true 才继续,
// onSuccess：解析成功后的回调，把 { header, results } 传回父组件

const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function
})

const excelUploadInput = ref(null)
// 点击触发上传
const handleUpload = () => {
  // 通过本来隐藏的 <input type="file"> 触发原生文件选择
  excelUploadInput.value.click()
}
//  选中文件成功 触发handleChange事件
const handleChange = (e) => {
  // 选择的文件
  const files = e.target.files
  //   只要第一个
  const rawFiles = files[0]
  //   如果不存在就直接 return
  if (!rawFiles) return
  upload(rawFiles)
}
// 触发上传事件
const upload = (rawFiles) => {
  excelUploadInput.value.value = null
  //   如果没有指定上传前回调
  //   如果指定上传前回调，那么就只有返回 true 的时候，才会执行对应的后续操作
  const before = props.beforeUpload(rawFiles)
  if (before) {
    readerData(rawFiles)
  }
}
const loading = ref(false)
// 读取数据
const readerData = (rawFiles) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // 创建一个 FileReader 实例，用于读取文件内容
    const reader = new FileReader()

    // 设置文件读取完成后的回调函数
    // 当 readAsArrayBuffer 完成读取时，会触发此事件
    reader.onload = (e) => {
      // 1.获取解析到的数据：
      //  获取读取到的原始数据（ArrayBuffer 格式）
      // e.target.result 包含了文件的二进制数据
      const data = e.target.result

      // 2. 利用 XLSX 对数据进行解析
      // 使用 XLSX 库将二进制数据解析为工作簿（workbook）对象
      // type: 'array' 表示输入数据是 ArrayBuffer 格式
      // workbook 包含 Excel 文件的所有工作表（Sheet）
      const workbook = XLSX.read(data, { type: 'array' })

      // 3. 获取第一张表格(工作簿)名称
      // SheetNames 是一个数组，存储了所有工作表的名称
      // [0] 表示取第一个工作表（通常称为 Sheet1）
      const firstSheetName = workbook.SheetNames[0]

      // 4. 只读取 Sheet1 (第一张表格) 的数据
      // 通过工作表名称获取对应的工作表对象
      // Sheets 是一个对象，键为工作表名称，值为工作表数据
      const worksheet = workbook.Sheets[firstSheetName]

      // 5. 解析数据表头
      // 提取工作表的表头行数据
      // getHeaderRow 是自定义工具函数，用于解析表头
      // 可能返回第一行数据作为表头，或者合并单元格后的表头
      const header = getHeaderRow(worksheet)

      // 6. 解析数据体
      // 将工作表数据转换为 JSON 格式的数组
      // sheet_to_json 是 XLSX 提供的工具方法
      // 默认将第一行作为键名（key），后续行作为数据
      // 返回形如 [{ 列名1: 值, 列名2: 值 }, ...] 的数组
      const results = XLSX.utils.sheet_to_json(worksheet)

      // 7. 传入解析之后的数据
      // 将解析后的数据传递给处理函数
      // generateData 会调用 props.onSuccess 将数据回传给父组件
      // 传递的数据结构为 { header: 表头数组, results: 数据数组 }
      generateData({ header, results })

      // 8. 关闭加载状态
      // loading.value 是响应式变量，控制 UI 中的加载动画显示
      loading.value = false

      // 9. 标记 Promise 为已完成状态
      // readerData 函数返回 Promise，此处 resolve 表示异步操作成功完成
      // 调用者可以通过 .then() 或 await 来等待解析完成
      resolve()
    }

    // 10. 启动文件读取操作 启动读取指定的 Blob 或 File 内容
    // readAsArrayBuffer 会异步读取文件内容
    // 读取完成后会触发 onload 事件
    // rawFile 是用户选择的文件对象（File 类型）
    reader.readAsArrayBuffer(rawFiles)
  })
}

// 根据导入的内容，生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
const handleDrop = () => {}
const handleDragover = () => {}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
