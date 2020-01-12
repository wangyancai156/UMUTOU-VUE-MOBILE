<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="库房">
                        <el-select
                            v-model="Warehouse.val"
                            clearable
                            placeholder="请选择库房"
                            @change="getWarehouseShelf"
                            class="handle-select mr10"
                            style="width:150px"
                        >
                            <el-option
                                v-for="item in Warehouse.data"
                                :key="item.Id"
                                :label="item.Name"
                                :value="item.Id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="货架">
                        <el-select
                            v-model="WarehouseShelf.val"
                            clearable
                            placeholder="请选择货架"
                            class="handle-select mr10"
                            style="width:150px"
                        >
                            <el-option
                                v-for="item in WarehouseShelf.data"
                                :key="item.Id"
                                :label="item.Name"
                                :value="item.Id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入库原因">
                        <el-select
                            v-model="InOutReason.val"
                            clearable
                            placeholder="请选择入库原因"
                            class="handle-select mr10"
                            style="width:150px"
                        >
                            <el-option
                                v-for="item in InOutReason.data"
                                :key="item.Id"
                                :label="item.Description"
                                :value="item.Id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品">
                        <el-select
                            v-model="Product.val"
                            clearable
                            placeholder="请选择产品"
                            class="handle-select mr10"
                            style="width:150px"
                        >
                            <el-option
                                v-for="item in Product.data"
                                :key="item.Id"
                                :label="item.ChineseName"
                                :value="item.Id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="Qty" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="单价">
                        <el-input v-model="Price" type="number"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">
                            提交
                        </el-button>
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
            Warehouse: {
                data: [],
                val: ""
            },
            WarehouseShelf: {
                data: [],
                val: ""
            },
            InOutReason: {
                data: [],
                val: ""
            },
            Product: {
                data: [],
                val: ""
            },
            Qty: 0,
            Price: 0
        };
    },
    activated() {
        this.initialization();
    },
    methods: {
        initialization() {
            this.getWarehouse();
            this.getInOutReason();
            this.getProduct();
        },
        getWarehouse() {
            this.$http
                .get("/api/Warehouse/GetWarehouse", {
                    SessionKey: "N001",
                    UserId: "N001"
                })
                .then(res => {
                    this.Warehouse.data = res.data;
                    this.Warehouse.val = res.data[0].Id;
                    console.log(res.data[0].Id);
                    this.getWarehouseShelf();
                });
        },
        getWarehouseShelf() {
            this.$http
                .get("/api/Warehouse/GetWarehouseShelf", {
                    params: {
                        warehoseId: this.Warehouse.val
                    }
                })
                .then(res => {
                    if (res.data.length > 0) {
                        this.WarehouseShelf.data = res.data;
                        this.WarehouseShelf.val = res.data[0].Id;
                    } else {
                        this.WarehouseShelf.data = null;
                        this.WarehouseShelf.val = "";
                    }
                    console.log(res.data);
                });
        },
        getInOutReason() {
            this.$http.get("/api/InOutReason/GetInReason", {}).then(res => {
                if (res.data.length > 0) {
                    this.InOutReason.data = res.data;
                    this.InOutReason.val = res.data[0].Id;
                }
                console.log(res.data);
            });
        },
        getProduct() {
            this.$http.get("/api/Product/GetProductView", {}).then(res => {
                this.Product.data = res.data;
                this.Product.val = res.data[0].Id;
                console.log(res.data);
            });
        },
        onSubmit() {
            this.$http
                .get("/api/InOutBound/AddInBound", {
                    params: {
                        WarehouseId: this.Warehouse.val,
                        WarehouseShelfId: this.WarehouseShelf.val,
                        InOutReasonId: this.InOutReason.val,
                        ProductId: this.Product.val,
                        Qty: this.Qty,
                        Price: this.Price,
                        Currency: "RMB",
                        Note: "",
                        CreateUserId: "W001"
                    }
                })
                .then(res => {
                    setTimeout(this.$router.push("spotinventory"), 1000);
                });
        }
    }
};
</script>