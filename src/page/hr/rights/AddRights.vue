<template>
  <div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="form.Name"></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input v-model="form.Url"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="form.Icon"></el-input>
          </el-form-item>
          <el-form-item label="显示">
            <el-switch v-model="form.IsShow"></el-switch>
          </el-form-item>
          <el-form-item label="说明">
            <el-input type="textarea" rows="5" v-model="form.Description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        Id: "",
        ParentId: "",
        Name: "",
        Url: "",
        IsShow: "",
        Description: "",
        Icon: ""
      }
    };
  },
  activated() {
    this.form.ParentId = this.$route.query.parentId;
    console.log(this.$route.query);
  },
  methods: {
    onSubmit() {
      console.log(this.from);
      this.$http
        .get("/api/Rights/AddRights", {
          params: {
            Id: "",
            ParentId: this.form.ParentId,
            Name: this.form.Name,
            Url: this.form.Url,
            IsShow: this.form.IsShow,
            Description: this.form.Description,
            Icon: this.form.Icon
          }
        })
        .then(res => {
          this.$router.push("Rights");
        });
    }
  }
};
</script>