<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="采购类型">
                        <el-select v-model="PurchaseType.val" placeholder="请选择采购类型" class="handle-select mr10" style="width:100%">
                            <el-option v-for="item in PurchaseType.data" :key="item.Id" :label="item.Description" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-select v-model="Supplier.val" filterable placeholder="选择供应商" class="handle-select mr10" style="width:100%">
                            <el-option v-for="item in Supplier.data" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="付款类型">
                        <el-select v-model="PaymentType.val" placeholder="选择付款类型" class="handle-select mr10" style="width:100%">
                            <el-option v-for="item in PaymentType.data" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onCancel" >取消</el-button>
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
            PurchaseType: {
                data: [],
                val: ""
            },
            Supplier: {
                data: [],
                val: "",
                loading: false
            },
            PaymentType: {
                data: [],
                val: ""
            } 
        };
    },
    activated() {
        this.initialization();
    },
    methods: {
        initialization() {
            this.getPurchaseType();
            this.getPaymentType();
            this.getSupplier();
        },
        getPurchaseType() {
            this.$http
                .get("/api/PurchaseOrder/GetPurchaseType", {})
                .then(res => {
                    this.PurchaseType.data = res.data;
                    this.PurchaseType.val = res.data[0].Id;
                    console.log(res.data[0].Id);
                });
        },
        getSupplier() {
            this.$http
                .get("/api/PurchaseOrder/GetSupplierView", {})
                .then(res => {
                    this.Supplier.data = res.data;
                    this.Supplier.val = res.data[0].Id;
                    console.log(res.data);
                });
        },
        getPaymentType() {
            this.$http
                .get("/api/PurchaseOrder/GetPaymentType", {})
                .then(res => {
                    this.PaymentType.data = res.data;
                    this.PaymentType.val = res.data[0].Id;
                    console.log(res.data[0].Id);
                });
        },
        onSubmit() {
            const operatorId = window.localStorage.getItem('ms_username');
            this.$http
                .get("/api/PurchaseOrder/AddPurchaseOrder", {
                    params: {
                        PurchaseTypeId: this.PurchaseType.val,
                        SupplierId: this.Supplier.val,
                        PaymentTypeId: this.PaymentType.val,
                        Note: "",
                        CreateUserId: operatorId
                    }
                })
                .then(res => {
                    setTimeout(this.$router.push("mypurchaseorder"), 1000);
                });
        },
        onCancel(){
            setTimeout(this.$router.push("mypurchaseorder"), 1000);
        }

    }
};
</script>