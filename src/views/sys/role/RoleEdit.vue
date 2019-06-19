<template>
  <div>
    <el-dialog :title="roleForm.roleId?'修改角色':'新增角色'"
               :visible.sync="roleFormVisible"
               :show-close="false"
               :close-on-click-modal="false">
      <el-form ref="roleForm" :model="roleForm" autocomplete="off" :label-width="labelWidth">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            :data="menuTreeData"
            node-key="menuId"
            ref="menuTree"
            show-checkbox
            :expand-on-click-node="false"
            :props="{children: 'children',label: 'menuName'}">
          </el-tree>
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
  import { fetchMenus } from '@/api/sys/menu/menu'
  import { buildTree } from '@/utils/tools'

  export default {
    name: 'RoleEdit',
    props: {
      roleFormVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        labelWidth: '80px',
        roleForm: {
          roleId: '',
          roleName: '',
          remark: '',
          menuIds: []
        },
        menuTreeData: []
      }
    },
    methods: {
      handleCancel: function() {
        this.$emit('handle-cancel')
        this.reset()
      },
      handleOk: function() {

      },
      setRoleForm: function(role) {
        Object.keys(this.roleForm).forEach(key => {
          this.roleForm[key] = role[key]
        })
        this.$nextTick(()=>{
          this.$refs.menuTree.setCheckedKeys(this.roleForm.menuIds)
        })
      },
      reset: function() {
        this.$refs.menuTree.setCheckedKeys([])
        this.roleForm = {
          roleId: '',
          roleName: '',
          remark: ''
        }
      }
    },
    mounted() {
      fetchMenus().then(res => {
        this.menuTreeData = buildTree(res.data.data, 'menuId')
      })
    }
  }
</script>

<style scoped>

</style>
