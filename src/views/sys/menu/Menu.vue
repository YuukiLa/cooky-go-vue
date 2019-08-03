<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-dropdown>
            <el-button type="primary" icon="el-icon-plus" v-has-rule="'menu_add'">新建菜单</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="showAddMenu('top')">顶级菜单</el-dropdown-item>
              <el-dropdown-item @click.native="showAddMenu('child')">子菜单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-popover
            placement="top"
            width="200"
            v-model="visible">
            <p>删除父菜单对应子菜单将转为顶级菜单!</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" @click="visible = false">取消</el-button>
              <el-button type="warning" size="mini" @click="handleDeleteMenu">确定</el-button>
            </div>
            <el-button icon="el-icon-delete" slot="reference" v-has-rule="'menu_delete'">删除</el-button>
          </el-popover>
          <el-tree
            style="margin-top: 8px"
            :draggable="hasRole('menu_edit')"
            :data="menuTreeData"
            node-key="menuId"
            ref="menuTree"
            @current-change="handleCurrentKeyChange"
            @node-drop="handleDropComplete"
            :highlight-current="true"
            :expand-on-click-node="false"
            :allow-drop="(draggingNode, dropNode, type)=>  dropNode.data.menuType!==2"
            :props="{children: 'children',label: 'menuName'}">
          </el-tree>
        </el-col>

        <el-col :span="16"  style="border-left: #c0ccda solid 1px">
          <!--          <span style="font-size: 25px">编辑菜单</span>-->
          <el-row type="flex" justify="center">
            <el-form ref="menuForm" :model="menuForm" label-width="80px">
              <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="menuForm.menuName"></el-input>
              </el-form-item>
              <el-form-item label="权限标识" prop="permission">
                <el-input v-model="menuForm.permission"></el-input>
              </el-form-item>
              <el-form-item label="组件名称" prop="componentName">
                <el-input v-model="menuForm.componentName"></el-input>
              </el-form-item>
              <el-form-item label="请求路径" prop="url">
                <el-input v-model="menuForm.url"></el-input>
              </el-form-item>
              <el-form-item label="请求方法" prop="method">
                <el-select placeholder="请选择" v-model="menuForm.method">
                  <el-option
                    v-for="item in requestMethod"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单类型" prop="menuType">
                <el-select placeholder="请选择" v-model="menuForm.menuType">
                  <el-option
                    v-for="item in menuType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button type="primary" v-if="menuForm.menuId" @click="handleEditMenu" v-has-rule="'menu_edit'">修改</el-button>
            <el-button type="primary" v-else @click="handleSaveMenu" v-has-rule="'menu_add'">保存</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { fetchMenus,addMenu,editMenu,deleteMenu } from '@/api/sys/menu/menu'
  import { buildTree } from '@/utils/tools'

  export default {
    name: 'Menu',
    data() {
      return {
        visible: false,
        requestMethod: [
          {
            label: 'GET',
            value: 'GET'
          },
          {
            label: 'POST',
            value: 'POST'
          },
          {
            label: 'PUT',
            value: 'PUT'
          },
          {
            label: 'DELETE',
            value: 'DELETE'
          },
          {
            label: 'PATCH',
            value: 'PATCH'
          },
          {
            label: '*',
            value: '*'
          }
        ],
        menuType: [
          {
            label: '菜单',
            value: 1
          },
          {
            label: '按钮',
            value: 2
          },
        ],
        menuTreeData: [],
        menuForm: {
          menuId: 0,
          menuName: '',
          permission: '',
          componentName: '',
          url: '',
          method: '',
          menuType: '',
          parentId: ''
        }
      }
    },
    methods: {
      handleCurrentKeyChange: function(currData) {
        Object.keys(this.menuForm).forEach(key => {
          this.menuForm[key]  = currData[key]
        })
      },
      handleSaveMenu: function() {
        addMenu(this.menuForm).then(res => {
          if(res.code===200){
            this.$message.success(res.msg)
            this.$refs.menuForm.resetFields()
            this._fetchMenus()
          }else {
            this.$message.warning(res.msg)
          }
        })
      },
      handleEditMenu: function() {
        editMenu(this.menuForm).then(res => {
          if(res.code===200){
            this.$message.success(res.msg)
            this.$refs.menuForm.resetFields()
            this._fetchMenus()
          }else {
            this.$message.warning(res.msg)
          }
        })
      },
      handleDeleteMenu: function() {
        if(this.menuForm.menuId){
          deleteMenu(this.menuForm.menuId).then(res => {
            if(res.code===200){
              this.$message.success(res.msg)
              this.$refs.menuForm.resetFields()
              this._fetchMenus()
            }else {
              this.$message.warning(res.msg)
            }
          })
        }else {
          this.$message.warning("请先选择要删除的菜单节点")
        }
        this.visible = false
      },
      handleDropComplete: function(before,after,type) {
        let menu = {}
        menu.parentId = type==='inner'?after.data.menuId:after.data.parentId
        menu.menuId = before.data.menuId
        editMenu(menu).then(res => {
          if(res.code===200){
            this.$message.success(res.msg)
          }else {
            this.$message.warning(res.msg)
          }
        })
      },
      showAddMenu: function(type) {
        if(type==='top') {
          this.$refs.menuForm.resetFields()
          this.menuForm.menuId = 0
          this.menuForm.parentId = 0
          this.menuForm.menuType = 1
          this.$refs.menuTree.setCurrentNode('')
        }else {
          let parentId = this.menuForm.menuId
          if(parentId){
            this.$refs.menuForm.resetFields()
            this.menuForm.parentId = parentId
            this.menuForm.menuId = 0
          }else {
            this.$message.warning("请先选中父菜单")
          }
        }
      },
      _fetchMenus: function() {
        fetchMenus().then(res => {
          this.menuTreeData = buildTree(res.data.data, 'menuId')
        })
      }
    },
    mounted() {
      this._fetchMenus()
    }
  }
</script>

<style lang="scss" scoped>
  .el-input--small .el-input__inner {
    width: 300px;
  }
</style>
