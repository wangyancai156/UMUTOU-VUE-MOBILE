<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="部门">
                        <el-cascader :options="form.organization.data" @change="oncascaderChang"></el-cascader>
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
                name: "",
                description: "",
                telephone: "",
                organization: {
                    val: "",
                    data: []
                }
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
            this.form.organization.val = keyid;
        },
        //提交
        onSubmit() {
            this.$http
                .get("/api/Users/AddUsers", {
                    params: {
                        Id: "",
                        Name: this.form.name,
                        Pwd: "111111",
                        Organizationid: this.form.organization.val,
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