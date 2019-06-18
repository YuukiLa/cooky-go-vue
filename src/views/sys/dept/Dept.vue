<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="6" style="border-right: #c0ccda solid 1px">
          <el-dropdown>
            <el-button type="primary" icon="el-icon-plus">新建部门</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="showAddDept('top')">顶级部门</el-dropdown-item>
              <el-dropdown-item @click.native="showAddDept('child')">子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-popover
            placement="top"
            width="200"
            v-model="visible">
            <p>删除父部门对应子部门将转为顶级部门!</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" @click="visible = false">取消</el-button>
              <el-button type="warning" size="mini" @click="handleDeleteDept">确定</el-button>
            </div>
            <el-button icon="el-icon-delete" slot="reference">删除</el-button>
          </el-popover>
          <el-tree
            style="margin-top: 8px"
            draggable
            :data="deptTreeData"
            default-expand-all
            node-key="deptId"
            ref="deptTree"
            @node-drop="handleDropComplete"
            @current-change="handleCurrentKeyChange"
            :highlight-current="true"
            :expand-on-click-node="false"
            :props="{children: 'children',label: 'deptName'}">
          </el-tree>
        </el-col>
        <el-col :span="16">
          <el-row type="flex" justify="center">
            <el-form ref="deptForm" :model="deptForm" label-width="80px" >
              <el-form-item label="部门名" prop="deptName">
                <el-input v-model="deptForm.deptName"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="deptForm.remark"></el-input>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button type="primary" style="margin: 0 auto" @click="handleEditDept" v-if="deptForm.deptId">修改</el-button>
            <el-button type="primary" style="margin: 0 auto" @click="handleSaveDept" v-else>保存</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { fetchDepts, addDept,editDept,deleteDept } from '@/api/sys/dept/dept'
  import { buildTree } from '@/utils/tools'

  export default {
    name: 'Dept',
    data() {
      return {
        deptTreeData: [],
        visible: false,
        deptForm: {
          deptId: '',
          deptName: '',
          remark: '',
          parentId: ''
        },
        deptFormVisible: false,
        parentDept: { parentId: 0, deptName: '上级部门' }
      }
    },
    methods: {
      handleCurrentKeyChange: function(currData) {
        Object.keys(this.deptForm).forEach(key => {
          this.deptForm[key]  = currData[key]
        })
      },
      handleSaveDept: function() {
        addDept(this.deptForm).then(res => {
          if(res.code==200){
            this.$message.success(res.msg)
            this.$refs.deptForm.resetFields()
            this._fetchDepts()
          }else {
            this.$message.warning(res.msg)
          }
        })
      },
      handleEditDept: function() {
        editDept(this.deptForm).then(res => {
          this.$message.success('修改成功')
          this.$refs.deptForm.resetFields()
          this._fetchDepts()
        })
      },
      handleDeleteDept: function() {
        if(this.deptForm.deptId){
          deleteDept(this.deptForm.deptId).then(res => {
            this.$message.success('修改成功')
            this.$refs.deptForm.resetFields()
            this._fetchDepts()
            this.visible = false
          })
        }
      },
      handleDropComplete: function(before,after,type) {
        let dept = {}
        dept.parentId = type==='inner'?after.data.deptId:after.data.parentId
        dept.deptId = before.data.deptId
        editDept(dept).then(res => {
          if(res.code===200){
            this.$message.success(res.msg)
          }else {
            this.$message.warning(res.msg)
          }
        })
      },
      showAddDept: function(type) {
        if(type==='top') {
          this.$refs.deptForm.resetFields()
          this.deptForm.deptId = 0
          this.deptForm.parentId = 0
          this.$refs.deptTree.setCurrentNode('')
        }else {
          let parentId = this.deptForm.deptId
          if(parentId){
            this.$refs.deptForm.resetFields()
            this.deptForm.parentId = parentId
            this.deptForm.deptId = 0
          }else {
            this.$message.warning("请先选中父部门")
          }
        }
      },
      _fetchDepts: function() {
        fetchDepts().then(res => {
          this.deptTreeData = buildTree(res.data.data, 'deptId')
        })
      }
    },
    mounted() {
      this._fetchDepts()
    }
  }
</script>

<style lang="scss" scoped>
  .el-input--small, .el-input__inner {
    width: 300px;
  }
</style>
