<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.Name"></el-input>
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
        data: function(){
            return {
                form: {
                    ParentId:'',
                    Name: '',
                    Description: '',
                }
            }
        },
        activated(){
            this.form.ParentId = this.$route.query.parentid;
            console.log( this.$route.query );
        },
        methods: {
            onSubmit() {
                this.$http
                .get("/api/Organization/AddOrganization", {
                params: {  
                        ParentId:this.form.ParentId,
                        Name:this.form.Name,
                        Description:this.form.Description,
                        }
                })
                .then(res => {
                  
                     this.$router.push('organization');
                });
           }

        }
    }
</script>