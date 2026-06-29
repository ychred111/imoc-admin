<template>
    <!-- 展示外部图标 -->
     <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className"></div>

    <!-- 展示内部图标 -->
     <svg v-else class="svg-icon" :class="className" aria-hidden="true">
        <use :xlink:href="iconName"></use>
     </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal as external } from '@/utils/validate'
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },

  // 图标类名
  className: {
    type: String,
    required: true
  }

})

// 判断当前图标是否是外部图标
// 外部图标样式
// 内部图标样式
// 封装一个方法，判断是否是外部资源

// 计算属性判断传进来的icon是否是外部资源
const isExternal = computed(() => external(props.icon))

// 图标的样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50% `
}))

// 内部图标
const iconName = computed(() => `#icon-${props.icon}`)

</script>

<script>
export default {
  name: 'SvgIcon'
}
</script>

<style scoped lang="scss">
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>
