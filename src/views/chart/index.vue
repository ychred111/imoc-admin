<template>
  <div class="chart-container">
    <!-- 第一行 -->
    <!-- 累计收益趋势图 -->
    <trend-vue></trend-vue>

    <!-- 第二行 -->
    <el-row class="mt-20" :gutter="20">
      <el-col :span="16">
        <!-- 日金额分析图 -->
        <horizontal-BarVue></horizontal-BarVue>
      </el-col>
      <el-col :span="8">
        <!-- 日历图 -->
        <calendar-Vue></calendar-Vue>
      </el-col>
    </el-row>

    <!-- 第三行 -->
    <el-row class="mt-20" :gutter="20">
        <el-col :span="6">
          <div class="chart-map-left">
            <!-- 饼图 -->
          <pie-Vue></pie-Vue>
          <!-- 文档云图 -->
          <wordCloud-Vue ></wordCloud-Vue>
          </div>
        </el-col>
        <el-col :span="18">
          <!-- 地图可视化 -->
          <bMap-Vue></bMap-Vue>
        </el-col>
    </el-row>

    <!-- S2 表格数据图示 -->
    <tableSheet-Vue class="mt-20"></tableSheet-Vue>
  </div>
</template>

<script setup>
import trendVue from './components/trend'
import horizontalBarVue from './components/horizontal-bar'
import calendarVue from './components/calendar'
import pieVue from './components/pie'
import wordCloudVue from './components/word-cloud'
import bMapVue from './components/b-map'
import tableSheetVue from './components/table-sheet'
</script>
<style scoped lang="scss">
.mt-20 {
  margin-top: 20px;
}
</style>
