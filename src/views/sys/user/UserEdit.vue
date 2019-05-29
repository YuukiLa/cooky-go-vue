<template>
    <div>
      <el-dialog :title="userForm.id?'修改用户':'新增用户'"
                 :visible.sync="userFormVisible"
                 :show-close="false"
                 :close-on-click-modal	= "false">
        <el-form :model="userForm">
          <el-form-item label="用户名" :label-width="labelWidth">
            <el-input v-model="userForm.username" autocomplete="off"></el-input>
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
  export default {
    name: 'UserEdit',
    props:{
      userId: {
        type: Number,
        default: 0
      },
      userFormVisible: Boolean
    },
    data() {
      return {
        labelWidth: '80px',
        userForm: {
          id: this.userId,
          username: '',
          password: '',
        }
      }
    },
    methods: {
      handleCancel: function() {
        this.$emit("handle-cancel")
      },
      handleOk: function() {

      }
    }
  }
</script>

<style scoped>

</style>
