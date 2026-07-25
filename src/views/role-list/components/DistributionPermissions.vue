<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
  ref="treeRef"
  :data="allPermission"
  show-checkbox
  check-strictly
  node-key="id"
  default-expand-all
  :props="defaultProps"
/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="info" @click="onConfirm">{{ $t('msg.universal.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { rolePermission } from '@/api/role'
import { permissionList } from '@/api/permission'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const defaultProps = {
  children: 'children',
  label: 'permissionName'

}

const emits = defineEmits(['update:modelValue'])

/**
 * 确定按钮点击事件
 */
const onConfirm = async () => {
  closed()
}

// 获取所有权限
const allPermission = ref([])
const getallPermissions = async () => {
  allPermission.value = await permissionList()
//   console.log(allPermission.value)
}
getallPermissions()

// tree 节点
const treeRef = ref(null)
// 获取当前用户角色的权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  //   console.log('返回的权限数据:', checkedKeys)
  //   console.log('数据类型:', typeof checkedKeys)
  //   console.log('是否为数组:', Array.isArray(checkedKeys))
  //   console.log('数组内容:', checkedKeys)
  treeRef.value.setCheckedKeys(checkedKeys)
}

// const getRolePermission = async () => {
//   const checkedKeys = await rolePermission(props.roleId)
//   console.log('返回的权限数据:', checkedKeys)
//   console.log('treeRef.value 是否存在:', !!treeRef.value)

//   if (treeRef.value) {
//     // 先查看树当前有哪些数据
//     console.log('树的数据:', treeRef.value.data)

//     // 设置选中
//     treeRef.value.setCheckedKeys(checkedKeys)
//     console.log('setCheckedKeys 已调用')

//     // 验证是否设置成功
//     await nextTick()
//     const currentChecked = treeRef.value.getCheckedKeys()
//     console.log('当前选中的 keys:', currentChecked)
//   } else {
//     console.error('treeRef 不存在！请检查 ref 绑定')
//   }
// }

// 有id的时候才能调用

watch(
  () => props.roleId,
  val => {
    if (val) getRolePermission()
  }
)
/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style scoped lang='scss'>
/* 让选中的复选框更明显 */
:deep(.el-checkbox) {
  .el-checkbox__input.is-checked {
    .el-checkbox__inner {
      background-color: #409eff !important; /* 或你的主色 */
      border-color: #409eff !important;
    }
    & + .el-checkbox__label {
      color: #409eff !important; /* 文字也变色，更醒目 */
      font-weight: bold;
    }
  }
}
</style>
