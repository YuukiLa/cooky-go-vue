<template>
    <div>
      <el-card class="box-card">
        <el-button type="primary" plain>新增角色</el-button>
        <el-table
          :data="roleData"
          style="width: 100%">
          <el-table-column
            prop="roleId"
            label="id">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="ct"
            label="创建时间">
            <template slot-scope="scope">
              {{scope.row.ct|formatDate}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <el-button size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
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
