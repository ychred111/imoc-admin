<template>
 <el-timeline>
<el-timeline-item
v-for="item in  chapterData"
:key="item.id"
:timestamp="item.timestamp">
 {{ item.content }}
</el-timeline-item>
 </el-timeline>
</template>

<script setup>
import { chapter } from '@/api/user.js'
import { ref } from 'vue'

const chapterData = ref([])

const getChapterData = async () => {
  chapterData.value = await chapter()
  console.log(chapterData.value)
}

getChapterData()

</script>
<style scoped lang='less'>
</style>
