<template>
    <div>
      <el-dialog :title="deptForm.id?'修改部门':'新增部门'"
                 :visible.sync="deptFormVisible"
                 :show-close="false"
                 :close-on-click-modal	= "false">
        <el-form :model="deptForm">
          <el-form-item label="部门名" :label-width="labelWidth">
            <el-input v-model="deptForm.deptName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父部门" :label-width="labelWidth">
            <el-input v-model="parentDept.deptName" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="labelWidth">
            <el-input v-model="deptForm.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {addDept} from '@/api/sys/dept/dept'
  export default {
    name: 'DeptEdit',
    props: {
      deptId: {
        type: Number,
        default: 0
      },
      parentDept: {
        type: Object,
        default: {}
      },
      deptFormVisible: Boolean
    },
    data() {
      return {
        labelWidth: "80px",
        deptForm: {
          deptName: '',
          parentId: '',
          remark: ''
        }
      }
    },
    methods: {
      handleCancel: function() {
        this.$emit("handle-cancel")
      },
      handleOk: function() {
        this.deptForm.parentId = this.parentDept.parentId,
        addDept(this.deptForm).then(res => {
          if(res.code==200){
            this.$message.success(res.msg)
          }else {
            this.$message.warning(res.msg)
          }
          this.$emit("handleOk")
        })
      }
    }
  }
</script>

<style scoped>

</style>
