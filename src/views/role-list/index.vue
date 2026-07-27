<template>
  <div class="">
    <el-card>
       <el-table :data="allRole" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="info"
            size="small"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <distribution-permissions v-model="distributionPermissionsVisible" :roleId="selectRoleId"></distribution-permissions>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributionPermissions from './components/DistributionPermissions.vue'

const allRole = ref([])

const getRoleList = async () => {
  allRole.value = await roleList()
}

getRoleList()
watchSwitchLang(getRoleList)

// 分配权限
const selectRoleId = ref('')
const distributionPermissionsVisible = ref(false)
const onDistributePermissionClick = (row) => {
  selectRoleId.value = row.id
  distributionPermissionsVisible.value = true
}
</script>

<style lang="scss" scoped></style>
