<template>
   <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList" >
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      >
 {{ item.title }}
       </el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="info" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, nextTick } from 'vue'
import { roleList } from '@/api/role'
import { userRoles, updateRoles } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    requiredd: true
  },
  userId: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue', 'updateRole'])
const i18n = useI18n()
// 确定
const onConfirm = async () => {
  // 处理数据结构
  const roles = userRoleTitleList.value.map(title => {
    return allRoleList.value.find(roles => roles.title === title)
  })
  const res = await updateRoles(props.userId, roles)
  console.log(res)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
  emits('updateRole')
}

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

// 所有角色
const allRoleList = ref([])
const getRoleList = async () => {
  allRoleList.value = await roleList()
//   console.log('allRoleList:', allRoleList.value)
}
getRoleList()
watchSwitchLang(getRoleList)

// 当前用户角色
const userRoleTitleList = ref([])
// 获取当前用户角色
const getUserRoles = async () => {
//   const res = await userRoles(props.userId)
//   console.log(res)
//   userRoleTitleList.value = res.role.map(item => item.title)

  const res = await userRoles(props.userId)
  const titles = res.role.map(item => item.title)
  await nextTick() // 等待 DOM 更新
  userRoleTitleList.value = titles
}

watch(
  () => props.userId,
  val => {
    if (val) getUserRoles()
  }
)

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
