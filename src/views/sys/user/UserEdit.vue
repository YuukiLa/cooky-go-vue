<template xmlns="http://www.w3.org/1999/html">
    <div>
      <el-dialog :title="userForm.id?'修改用户':'新增用户'"
                 :visible.sync="userFormVisible"
                 :show-close="false"
                 :close-on-click-modal	= "false">
        <el-row type="flex" justify="center">
          <el-form :model="userForm" ref="userForm" autocomplete="off" label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="userForm.sex" placeholder="请选择" style="width: 250px">
                <el-option
                  v-for="sex in sexDict"
                  :key="sex.value"
                  :label="sex.label"
                  :value="sex.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="userForm.phone" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="deptId">
              <el-select v-model="userForm.deptId" placeholder="请选择" style="width: 250px">
                <el-option
                  v-for="dept in deptData"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="roleIds">
              <el-select v-model="userForm.roleIds" placeholder="请选择" :multiple="true" style="width: 250px">
                <el-option
                  v-for="role in roleData"
                  :key="role.roleId"
                  :label="role.roleName"
                  :value="role.roleId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-switch
                v-model="userForm.status"
                :active-value="0"
                active-text="开启"
                inactive-text="锁定"
                :inactive-value="1">
              </el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="userForm.remark" type="textarea" style="width: 250px"></el-input>
            </el-form-item>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { fetchDepts } from '@/api/sys/dept/dept'
  import {fetchRoles} from '@/api/sys/role/role'
  export default {
    name: 'UserEdit',
    props:{
      userFormVisible: Boolean
    },
    data() {
      return {
        deptData: [],
        roleData: [],
        sexDict: [{label:'男',value:0},{label:'女',value:1},{label:'保密',value:2}],
        userForm: {
          userId: 0,
          username: '',
          password: '',
          sex: '',
          deptId: '',
          email: '',
          phone: '',
          status: 0,
          remark: '',
          roleIds: []
        }
      }
    },
    methods: {
      handleCancel: function() {

        this.$refs['userForm'].resetFields()
        console.log(1111)
        this.$emit("handle-cancel")
      },
      handleOk: function() {

      },
      setUserForm: function(user) {
        this.$refs['userForm'].resetFields()
        Object.keys(this.userForm).forEach(key => {
          this.userForm[key] = user[key]
        })
      },
      _fetchDepts: function() {
        fetchDepts().then(res => {
          this.deptData = res.data.data//buildTree(res.data.data, 'deptId')
        })
      },
      _fetchRoles: function() {
        fetchRoles().then(res => {
          this.roleData = res.data.data
        })
      }
    },
    mounted() {
      this._fetchDepts()
      this._fetchRoles()
    }
  }
</script>

<style scoped>
  .el-input__inner {
    width: 200px !important;
  }

</style>
