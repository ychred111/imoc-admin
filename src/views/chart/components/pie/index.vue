<template>
 <!-- // 1. 创建 DOM 容器，并指导大小（指定ref 方便获取） -->
   <el-card
    :body-style="{
      paddingTop: '0'
    }"
  >
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
// Echarts 的基本步骤：
// 1. 创建 DOM 容器，并指导大小（指定ref 方便获取）
// 2. 导入 Echarts 模块
// 3. 利用 echarts.init(target) 方法，获取 mChart 实例
// 4. 构建 options 配置对象 （echarts渲染的核心，不同的options意味着不同的图表体现）
// 最后利用 mChart.setOption 方法配置 options
import { ref, onMounted } from 'vue'
import { getChartPie } from '@/api/chart'
// 2. 导入 Echarts 模块
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
// import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()
// 获取数据
const chartData = ref([])
const getChartData = async () => {
  const reslut = await getChartPie()
  chartData.value = reslut
  console.log(reslut)
  renderChart()
}
getChartData()

// 3. 利用 echarts.init(target) 方法，获取 mChart 实例
const target = ref(null)
let mChart
onMounted(() => {
  mChart = echarts.init(target.value)
})

const renderChart = () => {
  const options = {
    // 标题
    title: {
      text: i18n.t('msg.chart.pieChartTitle')
    },
    tooltip: {
      // {b}：数据名。{c}：数值。
      formatter: `{b}: {c} ${i18n.t('msg.chart.unit')}`
    },
    series: [
      {
        // 饼图
        type: 'pie',
        // 饼图的半径。第一项为内半径，第二项为外半径
        radius: ['40%', '70%'],
        // 每个 item 的样式
        itemStyle: {
          // 圆角
          borderRadius: 10,
          // 边框色
          borderColor: '#fff',
          // 边框宽度
          borderWidth: 2
        },
        // 文字
        label: {
          // 默认不显示
          show: false,
          // {b}：数据名。{d}：百分比。
          formatter: '{b}: {d}%',
          // 居中展示（在鼠标移入时）
          position: 'center'
        },
        // 高亮状态的扇区和标签样式
        emphasis: {
          // 文本
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold'
          }
        },
        data: chartData.value
      }
    ]
  }
  mChart.setOption(options)
}

</script>
<style scoped lang='scss'>
.container {
  height: 240px;
  // background-color: pink;

}
</style>
