<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="部门">
                        <el-cascader :options="form.organization.data" v-model="form.organization.val"  @change="oncascaderChang"   ></el-cascader>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.telephone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button>取消</el-button> 注：用户添加后密码默认为‘111111’
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
                Id:"",
                name: "",
                description: "",
                telephone: "",
                organization: {
                    val: [],
                    data: []
                },
                userPwd:""
            }
        };
    },
    activated() {
        this.initialization();
    },
    methods: {
        //初始化页面
        initialization() {
            this.getOrganization();
            this.getQuery();
        },
        //获取传值
        getQuery() {
            this.form.Id = this.$route.query.model.Id;
            this.form.name = this.$route.query.model.UserName;
            this.form.telephone = this.$route.query.model.Telephone;
            this.form.organization.val.length = 0;
            var arr3 = new Array(this.$route.query.model.Organization[0].OrganizationIdList.length);
            this.$route.query.model.Organization[0].OrganizationIdList.forEach(element => {
                this.form.organization.val.push(element);
            });
           
            this.form.userPwd = this.$route.query.model.UserPwd;
            console.log(this.form.organization.val);
        },
        //获取组织架构
        getOrganization() {
            this.$http
                .get("/api/Organization/GetOrganizationTree", {})
                .then(res => {
                    this.form.organization.data = res.data[0].children;
                });
        },
        oncascaderChang(key) {
            var keyid = key[key.length - 1];
           
            this.form.organization.val  = key;
            
        },
        //提交
        onSubmit() {
            this.$http
                .get("/api/Users/UpdateUsers", {
                    params: {
                        Id: this.form.Id,
                        Name: this.form.name,
                        Pwd: this.form.userPwd,
                        Organizationid: this.form.organization.val[this.form.organization.val.length-1],
                        Telephone: this.form.telephone
                    }
                })
                .then(res => {
                    this.$router.push("user");
                });
        }
    }
};
</script>