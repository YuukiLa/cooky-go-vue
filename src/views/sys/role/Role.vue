<template>
    <div>
      <el-card class="box-card">
        <el-button type="primary" plain @click="roleFormVisible = true" v-has-rule="'role_add'">新增角色</el-button>
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
              <el-button size="small" @click="handleEditRole(scope.row)" v-has-rule="'role_edit'">编辑</el-button>
              <el-button type="danger" size="small" style="margin-left: 8px;" slot="reference" @click="handleDeleteRole(scope.row.roleId)" v-has-rule="'role_delete'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <role-edit ref="editRole" :role-form-visible="roleFormVisible" @handle-close="roleFormVisible=false" @refresh="_fetchRoles"></role-edit>
    </div>
</template>

<script>
  import {fetchRoles,deleteRole} from '@/api/sys/role/role'
  import RoleEdit from './RoleEdit'
  export default {
    name: 'Role',
    components: {
      RoleEdit
    },
    data() {
      return {
        visible: false,
        roleData: [],
        roleFormVisible: false
      }
    },
    methods: {
      handleEditRole: function(role) {
        this.$refs.editRole.setRoleForm(role)
        this.roleFormVisible = true
      },
      handleDeleteRole: function(roleId) {
        this.$confirm('确定删除该角色？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole(roleId).then(res => {
            this.$message.success(res.msg)
            this._fetchRoles()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
