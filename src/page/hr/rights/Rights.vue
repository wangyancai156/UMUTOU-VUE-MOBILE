<template>
  <div class="container">
    <div class="handle-box">
      <el-button
        v-if="inquireParent"
        type="primary"
        icon="el-icon-back"
        @click="inquireParentNode()"
        class="handle-del mr10"
      >返回上一级</el-button>
      <el-button type="danger" icon="delete" class="handle-del mr10" @click="deleteNode()">批量删除</el-button>
      <el-button type="primary" icon="delete" class="handle-del mr10" @click="add">添加功能</el-button>
    </div>
    <el-table ref="list" @selection-change="selsChange" :data="table" style="width: 100%; ">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="Name" label="名称" style="withd:100px;"></el-table-column>
      <el-table-column prop="Level" label="等级"></el-table-column>
      <el-table-column prop="Url" label="链接"></el-table-column>
      <el-table-column prop="CreateDate" label="添加时间"></el-table-column>
      <el-table-column prop="Description" label="说明"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button size="small" type="primary" @click="inquireChildNode(scope.row)">子功能</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      parentId: -1,
      inquireParent: false,
      table: [],
      sels: []
    };
  },
  activated() {
    this.initialization();
  },
  methods: {
    initialization() {
      this.$http
        .get("/api/Rights/GetRightsView", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          console.log(res);
          this.table = res.data.Child;
          this.parentId = res.data.ParentId;

          console.log(this.parentId);
        });
    },
    add() {
      this.$router.push({ path: "/addrights", query: { parentId: this.id } });
    },
    edit(row) {
      this.$router.push({ path: "/editrights", query: { model: row } });
    },
    inquireChildNode(row) {
      this.parentId = this.id;
      this.id = row.Id;
      this.initialization();
      if (this.id == 0) {
        this.inquireParent = false;
      } else {
        this.inquireParent = true;
      }
      console.log(this.parentId);
      console.log(this.id);
    },
    inquireParentNode() {
      this.id = this.parentId;
      this.initialization();
      if (this.parentId == 0) {
        this.inquireParent = false;
      } else {
        this.inquireParent = true;
      }
      console.log(this.parentId);
      console.log(this.id);
    },
    selsChange(sels) {
      //被选中的行组成数组
      this.sels = sels;
    },
    deleteNode() {
      var ids = "";
      this.sels.forEach(element => {
        ids = ids + "|" + element.Id;
      });

      this.$http
        .get("/api/Rights/DeleteRights", {
          params: {
            id: ids
          }
        })
        .then(res => {
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
