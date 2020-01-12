<template>
  <div class="container">
    <div class="handle-box">
         <el-button v-if="inquireParent" type="primary" icon="el-icon-back"  @click="inquireParentNode()" class="handle-del mr10" >返回上一级</el-button>
      <el-button type="danger" icon="delete" class="handle-del mr10" @click="deletemodel"> 批量删除</el-button>
      <el-button type="primary" icon="delete" class="handle-del mr10" @click="add"> 添加权限 </el-button>
    </div>
    <el-table ref="list" @selection-change="selsChange" :data="table" >
      <el-table-column type="selection"  >
      </el-table-column>
      <el-table-column prop="Name" label="名称"  >
      </el-table-column>
      <el-table-column prop="IsValid" label="状态" :formatter="stateFormat" > 
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button size="small" type="primary" @click="showAddRight(scope.$index,scope.row)">功能</el-button>
          <el-button size="small" @click="inquireChildNode(scope.row)" >子角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="配置角色功能" :visible.sync="dialogVisible" size="tiny">
        <div class="select-tree">
            <el-scrollbar id="teer" tag="div" class='is-empty'>
                <el-tree 
                    ref="tree" 
                    :data="rightsTree.data" 
                    :props="rightsTree.defaultProps" 
                    show-checkbox 
                    default-expand-all
                    node-key="value" 
                    :default-checked-keys="rightsTree.checked"
                    >
                </el-tree>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" >取 消</el-button>
            <el-button type="primary"   @click="addRiht" >确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
    data() {
        return {   
            preParentId:1,
            ParentId: 1,//列表的父系节点，一般父节点都为1
            inquireParent:false,
            table: [],  //数据表
            sels: [],   //选中的值 
            dialogVisible: false, //显示添加功能弹出框
            rightsTree:{  //功能的树结构
                data:[],
                checked:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            },
            roleId:"" //添加功能时权限的ID
        };
    },
    activated() {
        this.initialization();
    },
    methods: {
        //初始化页面
        initialization() {
            this.getRole(this.ParentId);
        },
        inquireChildNode(row) {

            this.preParentId = this.ParentId;//记录
            this.ParentId = row.Id;
            this.initialization();
            if (this.ParentId == 1) {
                this.inquireParent = false;
            } else {
                this.inquireParent = true;
            }
            console.log(this.ParentId);
            console.log(this.preParentId);
        },
        inquireParentNode() {
            this.ParentId = this.preParentId;
            this.preParentId = 
            this.initialization();
            if (this.ParentId == 1) {
                this.inquireParent = false;
            } else {
                this.inquireParent = true;
            }
            console.log(this.ParentId);
            console.log(this.id);
        },
        //获取角色
        getRole(val) {
            this.$http
                .get("/api/Role/GetRoleView", {
                    params: {
                        roleId: this.ParentId
                    }
                })
                .then(res => {
                    //JSON.parse(JSON.stringify(res.data.Child));
                    console.log(res.data.Child);
                    this.table =  res.data.Child;
                    this.preParentId = res.data.ParentId;
                });
           
        },
        //格式化状态
        stateFormat(row, column) {
            var state = row[column.property];
            if (state == 1) {
                return "有效";
            } else {
                return "无效";
            }
        },
        //多选
        selsChange(sels) {
            //被选中的行组成数组
            this.sels = sels;
        },
        //添加角色
        add() {
            this.$router.push({
                path: "/addrole",
                query: { ParentId: this.ParentId }
            });
        },
        //编辑角色
        edit(row) {
            this.$router.push({ path: "/editrole", query: { model: row } });
        },
        //删除角色
        deletemodel() {
            var ids = "";
            this.sels.forEach(element => {
                ids = ids + element.Id + "|";
            });

            ids = ids.substring(0, ids.length - 1);
            console.log(ids);

            this.$http
                .get("/api/Role/DeleteRole", {
                    params: {
                        id: ids
                    }
                })
                .then(res => {
                    this.getRole();
                });
        },
        //显示添加功能
        showAddRight( row, column ){
            
            this.dialogVisible = true;
            this.roleId = column.Id
            console.log(column.Id);
            this.rightsTree.checked = column.RightsId;
            this.$http
            .get("/api/Role/GetRightsTreeView", {
                params: {
                    id: 0
                }
            })
            .then(res => {
                this.rightsTree.data = JSON.parse(JSON.stringify(res.data[0].children));
                console.log( this.rightsTree.data );
            });
            
        },
        addRiht(){
          
            var idlist = this.$refs.tree.getCheckedKeys();
            var ids = "";
            this.$refs.tree.getCheckedKeys().forEach(element => {
                ids = ids + "|" + element;
            });
            ids = ids.substring(1,ids.length)
            console.log(idlist);
            console.log(this.roleId);
            
            this.$http
                .get("/api/Role/RelationRigths", {
                    params: {
                        roleId: this.roleId,
                        rightid: ids
                    }
                })
                .then(res => {
                     this.dialogVisible =false;
                     this.initialization();
                });
        }
    }
};
</script>


<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>
