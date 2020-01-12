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
        Id: "122",
        Name: "",
        Url: "",
        IsShow: "",
        Description: "",
        ParentId: "",
        Icon: ""
      }
    };
  },
  activated() {
    console.log(this.$route.query.model);
    let {
      Id,
      Name,
      Url,
      IsShow,
      Description,
      ParentId,
      Icon
    } = this.$route.query.model;

    this.form.Id = Id;
    this.form.Name = Name;
    this.form.Url = Url;
    this.form.IsShow = IsShow;
    this.form.Description = Description;
    this.form.ParentId = ParentId;
    this.form.Icon = Icon;
    console.log(Id);
    console.log(this.form.Id);
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      let { Id, Name, Url, IsShow, Description, ParentId, Icon } = this.form;

      this.$http
        .get("/api/Rights/UpdateRights", {
          params: {
            Id: Id,
            ParentId: ParentId,
            Name: Name,
            Url: Url,
            IsShow: IsShow,
            Description: Description,
            Icon: Icon
          }
        })
        .then(res => {
          this.$router.push("Rights");
        });
    }
  }
};
</script>