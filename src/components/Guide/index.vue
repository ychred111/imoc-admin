<template>
 <div>
    <el-tooltip  :content="$t('msg.navBar.guide')"  >
        <svg-icon id="guide-start" icon="guide" @click="onClick" ></svg-icon>
    </el-tooltip>
 </div>
</template>

<script setup>
import Driver from 'driver.js'
// import 'driver.js/dist/driver.css'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './steps'

const i18n = useI18n()

let driver = null

const onClick = () => {
  console.log('点击触发') // 检查是否打印
  console.log('driver:', driver)
  console.log('steps:', steps(i18n))
  //   driver.defineSteps(steps(i18n))
  driver.defineSteps(steps(i18n))
  driver.start()
}

onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})
</script>
<style scoped lang='less'>
</style>
