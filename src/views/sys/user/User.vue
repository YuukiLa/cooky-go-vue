<template>
  <div>
    <el-card class="box-card">
      <el-button plain type="primary" size="small" @click="userFormVisible=true">新增用户</el-button>
      <el-table
        v-loading="loading"
        empty-text="-"
        :data="userData"
        style="width: 100%">
        <el-table-column
          prop="userId"
          label="用户id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.sex===0">男</el-tag>
            <el-tag type="danger" v-else-if="scope.row.sex===1">女</el-tag>
            <el-tag type="warning" v-else-if="scope.row.sex===2">保密</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0">有效</el-tag>
            <el-tag type="info" v-else>锁定</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 8px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="query.page"
        :page-sizes="[10, 20, 25, 50]"
        :page-size="query.pageSize"
        layout="sizes, prev, pager, next"
        :total="total">
      </el-pagination>

    </el-card>
    <user-edit :user-form="{id:1,name: ''}" :user-form-visible="userFormVisible" @handle-cancel="handleCancel" @handleOk="handleOk"></user-edit>
  </div>
</template>

<script>
  import {fetchUsers} from '@/api/sys/user/user'
  import UserEdit from './UserEdit'
  export default {
    name: 'User',
    components: {
      UserEdit
    },
    data() {
      return {
        userData: [],
        userFormVisible: false,
        loading: true,
        query: {
          username: '',
          page: 1,
          pageSize: 10,
        },
        total: 0
      }
    },
    methods: {
      handleCancel: function() {
        this.userFormVisible = false
      },
      handleOk: function() {

      },
      _fetchUsers: function() {
        this.loading = true
        fetchUsers(this.query).then(res => {
          this.userData = res.data.list
          this.total = res.data.total
          this.loading = false
        })
      },
      handleSizeChange: function(pageSize) {
        this.query.pageSize = pageSize
        this._fetchUsers()
      },
      handleCurrentChange: function(page) {
        this.query.page = page
        this._fetchUsers()
      }
    },
    mounted() {
      this._fetchUsers()
    }
  }
</script>

<style scoped>

</style>
