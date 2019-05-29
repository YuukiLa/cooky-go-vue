<template>
    <div>
      <el-card>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-tree
                :data="deptTreeData"
                default-expand-all
                node-key="deptId"
                ref="deptTree"
                @current-change	="handleCurrentKeyChange"
                highlight-current
                :props="defaultProps">
              </el-tree>
            </el-col>
            <el-col :span="16">
              <el-button type="primary" plain @click="deptFormVisible = true">新增部门</el-button>
              <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
              <el-table
                :data="showDeptData"
                style="width: 100%">
                <el-table-column
                  prop="deptId"
                  label="id"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="deptName"
                  label="部门名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
      </el-card>
      <dept-edit :dept-form-visible="deptFormVisible" @handle-cancel="handleCancel" @handleOk="handleOk" :parent-dept="parentDept"></dept-edit>
    </div>
</template>

<script>
  import {getAllDept} from '@/api/sys/dept/dept'
  import {buildTree} from '@/utils/tools'
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
        deptFormVisible: false,
        parentDept: {parentId:0,deptName:'上级部门'},
        defaultProps: {
          children: 'children',
          label: 'deptName'
        }
      }
    },
    methods: {
      handleCurrentKeyChange: function(currData,currNode) {
        this.showDeptData = this.deptData.filter(item=>item.parentId==currData.deptId)
        this.parentDept = {parentId:currData.deptId,deptName:currData.deptName}
      },
      handleCancel: function() {
        this.deptFormVisible = false
      },
      handleOk: function() {
        this._getDeptTree()
        this.$refs.deptTree.setCurrentKey(null)
        this.parentDept = {parentId:0,deptName:'上级部门'}
        this.deptFormVisible = false
      },
      handleReset: function() {
        this.$refs.deptTree.setCurrentKey(null)
        this.parentDept = {parentId:0,deptName:'上级部门'}
        this.showDeptData = this.deptData.filter(item=>item.parentId===0)
      },
      _getDeptTree: function() {
        getAllDept().then(res => {
          this.deptData = res.data.data
          this.deptTreeData = buildTree(res.data.data,"deptId")
          this.showDeptData = this.deptData.filter(item=>item.parentId===0)
        })
      }
    },
    mounted() {
      this._getDeptTree()
    }
  }
</script>

<style scoped>

</style>
