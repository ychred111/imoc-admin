<template>
  <div class="my-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="6">
        <project-card :features="featureData" class="user-card"></project-card>
      </el-col>

      <!-- 右边 -->
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <!-- 作者 -->
              <el-tab-pane :label="$t('msg.profile.author')">
              <author></author>
            </el-tab-pane>

            <!-- 功能 -->
             <el-tab-pane :label="$t('msg.profile.feature')">
              <feature :features="featureData"></feature>
            </el-tab-pane>

            <!-- 章节 -->
            <el-tab-pane :label="$t('msg.profile.chapter')">
              <chapter></chapter>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
// eslint-disable-next-line
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'
import { ref } from 'vue'
import { feature } from '@/api/user.js'
import { watchSwitchLang } from '@/utils/i18n.js'
const featureData = ref([])

const getFeatureData = async () => {
  featureData.value = await feature()
  // console.log(featureData.value)
}
getFeatureData()

watchSwitchLang(getFeatureData)

const activeName = ref('feature')
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
