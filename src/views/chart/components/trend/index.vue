<template>
  <!-- 累计收益趋势图 -->
  <el-card class="container" >
    <el-row :gutter="10" v-if="chartTrendData.allAmount">
      <el-col :span="6">
        <!-- 数据模块 -->
        <trend-data :data="chartTrendData" ></trend-data>
      </el-col>
      <el-col :span="18">
        <!-- 图表模块 -->
        <trend-chart></trend-chart>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import trendData from './trend-data.vue'
import trendChart from './trend-chart.vue'
import { getChartTrend } from '@/api/chart.js'

const chartTrendData = ref({})
const getChartTrendData = async () => {
  const res = await getChartTrend()
  //   console.log(res)
  chartTrendData.value = res
}
getChartTrendData()
</script>
<style scoped lang="scss">
.container {
  height: 286px;
}
</style>
