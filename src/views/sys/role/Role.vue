<template>
    <div>
      <el-card class="box-card">
        <el-button type="primary" plain @click="roleFormVisible = true">新增角色</el-button>
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
            <template slot-scope="scope">
              <el-button size="small" @click="handleEditRole(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" style="margin-left: 8px;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <role-edit ref="editRole" :role-form-visible="roleFormVisible" @handle-cancel="roleFormVisible=false"></role-edit>
    </div>
</template>

<script>
  import {fetchRoles} from '@/api/sys/role/role'
  import RoleEdit from './RoleEdit'
  export default {
    name: 'Role',
    components: {
      RoleEdit
    },
    data() {
      return {
        roleData: [],
        roleFormVisible: false
      }
    },
    methods: {
      handleEditRole: function(role) {
        this.$refs.editRole.setRoleForm(role)
        this.roleFormVisible = true
      },
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
