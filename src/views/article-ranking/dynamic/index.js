
// 动态的列数据
// 被勾选的动态列数据
// table的列数据

import { ref, watch } from 'vue'
import getDynamicData from './DynamicData'
import { watchSwitchLang } from '@/utils/i18n'

// 暴露出动态列的数据
export const dynamicData = ref(getDynamicData())

watchSwitchLang(() => {
  // 重新获取国际化的值得
  dynamicData.value = getDynamicData()
  // 重新处理被勾选的列数据
  initSelectDynamicLable()
})

// 创建被勾选的动态列的数据. selectDynamicLabel
export const selectDynamicLable = ref([])

// 提取每一列的名字
// map 方法遍历数组，提取每个对象的 label 属性 返回一个新的字符串数组
const initSelectDynamicLable = () => {
// 默认全部勾选
  selectDynamicLable.value = dynamicData.value.map(item => item.label)
  console.log(selectDynamicLable.value)
}
initSelectDynamicLable()

// 声明table的列数组
export const tableColumn = ref([])

// 监听选中项的变化，根据选中项动态改变 table 列数据的值

watch(
  selectDynamicLable,
  val => {
    tableColumn.value = []
    // 遍历选中项
    const selectData = dynamicData.value.filter(item => {
      return val.includes(item.label)
    })
    tableColumn.value.push(...selectData)
  }, {
    immediate: true
  }
)
