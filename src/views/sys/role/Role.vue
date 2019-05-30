<template>
    <div>
      <el-card class="box-card">
        <el-button type="primary" plain>新增角色</el-button>
        <el-table
          :data="roleData"
          style="width: 100%">
          <el-table-column
            prop="roleId"
            label="id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
  import {fetchRoles} from '@/api/sys/role/role'
  export default {
    name: 'Role',
    data() {
      return {
        roleData: []
      }
    },
    methods: {
      _fetchRoles: function() {
        fetchRoles().then(res => {
          this.roleData = res.data.data
        })
      }
    },
    mounted() {
      this._fetchRoles()
    }
  }
</script>

<style scoped>

</style>
