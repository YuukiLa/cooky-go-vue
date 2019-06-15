<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="8" style="border-right: #c0ccda solid 1px">
          <el-button type="primary" plain @click="deptFormVisible = true">新增部门</el-button>
          <!--              <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>-->
          <el-tree
            style="margin-top: 8px"
            :data="deptTreeData"
            default-expand-all
            node-key="deptId"
            ref="deptTree"
            @current-change="handleCurrentKeyChange"
            :highlight-current="true"
            :expand-on-click-node="false"
            :props="{children: 'children',label: 'deptName'}">
          </el-tree>
        </el-col>
        <el-col :span="16" v-show="deptForm.deptId">
          <el-row type="flex" justify="center">
            <el-form ref="deptForm" :model="deptForm" label-width="80px" >
              <el-form-item label="部门名">
                <el-input v-model="deptForm.deptName"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="deptForm.remark"></el-input>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button type="primary" style="margin: 0 auto" @click="handleEditDept">修改</el-button>
          </el-row>
          <!--              <el-table-->
          <!--                :data="showDeptData"-->
          <!--                style="width: 100%">-->
          <!--                <el-table-column-->
          <!--                  prop="deptId"-->
          <!--                  label="id"-->
          <!--                  width="180">-->
          <!--                </el-table-column>-->
          <!--                <el-table-column-->
          <!--                  prop="deptName"-->
          <!--                  label="部门名"-->
          <!--                  width="180">-->
          <!--                </el-table-column>-->
          <!--                <el-table-column-->
          <!--                  prop="remark"-->
          <!--                  label="备注">-->
          <!--                </el-table-column>-->
          <!--              </el-table>-->
        </el-col>
      </el-row>
    </el-card>
    <dept-edit :dept-form-visible="deptFormVisible" @handle-cancel="handleCancel" @handleOk="handleOk"
               :parent-dept="parentDept"></dept-edit>
  </div>
</template>

<script>
  import { fetchDepts, editDept } from '@/api/sys/dept/dept'
  import { buildTree } from '@/utils/tools'
  import DeptEdit from './DeptEdit'

  export default {
    name: 'Dept',
    components: {
      DeptEdit
    },
    data() {
      return {
        deptTreeData: [],
        deptData: [],
        showDeptData: [],
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
      handleCurrentKeyChange: function(currData, currNode) {
        // this.showDeptData = this.deptData.filter(item=>item.parentId==currData.deptId)
        this.deptForm = { ...currData }
        this.parentDept = { parentId: currData.deptId, deptName: currData.deptName }
      },
      handleEditDept: function() {
        editDept(this.deptForm).then(res => {
          this.$message.success('修改成功')
          this._fetchDepts()
        })
      },
      handleCancel: function() {
        this.deptFormVisible = false
      },
      handleOk: function() {
        this._fetchDepts()
        this.$refs.deptTree.setCurrentKey(null)
        this.parentDept = { parentId: 0, deptName: '上级部门' }
        this.deptFormVisible = false
      },
      handleReset: function() {
        this.$refs.deptTree.setCurrentKey(null)
        this.parentDept = { parentId: 0, deptName: '上级部门' }
        this.showDeptData = this.deptData.filter(item => item.parentId === 0)
      },
      _fetchDepts: function() {
        fetchDepts().then(res => {
          this.deptData = res.data.data
          this.deptTreeData = buildTree(res.data.data, 'deptId')
          this.showDeptData = this.deptData.filter(item => item.parentId === 0)
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
