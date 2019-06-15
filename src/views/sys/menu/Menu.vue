<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="16">
        <el-col :span="8" style="border-right: #c0ccda solid 1px">
          <el-dropdown>
            <el-button type="primary" icon="el-icon-plus">新建菜单</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>顶级菜单</el-dropdown-item>
              <el-dropdown-item>子菜单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" @click="visible = false">取消</el-button>
              <el-button type="warning" size="mini" @click="visible = false">确定</el-button>
            </div>
            <el-button icon="el-icon-delete" slot="reference">删除</el-button>
          </el-popover>
          <el-tree
            style="margin-top: 8px"
            :data="menuTreeData"
            node-key="deptId"
            ref="deptTree"
            @current-change="handleCurrentKeyChange"
            :highlight-current="true"
            :expand-on-click-node="false"
            :props="{children: 'children',label: 'menuName'}">
          </el-tree>


        </el-col>

        <el-col :span="16">
          <!--          <span style="font-size: 25px">编辑菜单</span>-->
          <el-row type="flex" justify="center">
            <el-form ref="menuForm" :model="menuForm" label-width="80px">
              <el-form-item label="菜单名称">
                <el-input v-model="menuForm.menuName"></el-input>
              </el-form-item>
              <el-form-item label="权限标识">
                <el-input v-model="menuForm.permission"></el-input>
              </el-form-item>
              <el-form-item label="组件名称">
                <el-input v-model="menuForm.componentName"></el-input>
              </el-form-item>
              <el-form-item label="请求路径">
                <el-input v-model="menuForm.url"></el-input>
              </el-form-item>
              <el-form-item label="请求方法">
                <el-select placeholder="请选择" v-model="menuForm.method">
                  <el-option
                    v-for="item in requestMethod"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单类型">
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
            <el-button type="primary">修改</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { fetchMenus } from '@/api/sys/menu/menu'
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
          menuId: '',
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
      handleCurrentKeyChange: function(currData, currNode) {
        // this.showDeptData = this.deptData.filter(item=>item.parentId==currData.deptId)
        this.menuForm = { ...currData }
        // this.parentDept = {parentId:currData.deptId,deptName:currData.deptName}
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
