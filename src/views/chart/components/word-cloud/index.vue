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
import { getChartWordCloud } from '@/api/chart'
import 'echarts-wordcloud'
// 2. 导入 Echarts 模块
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { randomRGB } from '@/utils/color'
import wordcloudBg from '@/assets/wordcloud.png'

const i18n = useI18n()

// 获取数据
const wordCloudData = ref([])
const getChartData = async () => {
  const reslut = await getChartWordCloud()
  wordCloudData.value = reslut
  // console.log(reslut)
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
  // 图像轮廓
  const maskImage = new Image()
  maskImage.src = wordcloudBg
  // 4. 构建 options 配置对象 （echarts渲染的核心，不同的options意味着不同的图表体现）
  const options = {
    // 标题
    title: {
      text: i18n.t('msg.chart.cloudChartTitle')
    },
    series: [
      { // 类型
        type: 'wordCloud',
        // 数据映射文本的大小范围
        sizeRange: [4, 80],
        // 文字旋转范围
        rotationRange: [0, 0],
        // 单词之间的间距
        gridSize: 0,
        // 绘制将排除图像的轮廓
        maskImage: maskImage,
        // 渲染动画
        layoutAnimation: true,
        // 字体
        textStyle: {
          // 随机色值
          color: randomRGB
        },
        // 高亮字体
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000'
          }
        },
        // 数据
        data: wordCloudData.value
      }
    ]

  }
  // 最后利用 mChart.setOption 方法配置 options
  // 等待图像加载完成之后
  maskImage.onload = function () {
    mChart.setOption(options)
  }
}
watchSwitchLang(renderChart)

</script>
<style scoped lang='scss'>
.container {
  height: 240px;
  // background-color: pink;
}
</style>
