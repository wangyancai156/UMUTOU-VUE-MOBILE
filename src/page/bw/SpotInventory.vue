<template>
    <div class="container">
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" style=" width:80px;" @click="inBound">入库</el-button>
        </div>
        <el-table :data="table" style="width: 100%; ">
            <el-table-column type="selection" style="width: 5%; ">
            </el-table-column>
            <el-table-column prop="WarehouseName" label="库房"   style="width: 20%; ">
            </el-table-column>
            <el-table-column prop="ProductChineseName" label="产品"  style="width: 30%; ">
            </el-table-column>
            <el-table-column prop="Qty" label="数量"  style="width: 20%; ">
            </el-table-column>
            <el-table-column prop="Price" label="成本"  style="width: 20%; ">
            </el-table-column>
            <el-table-column   label="操作" style="width: 5%; ">
                <template slot-scope="scope">
                    <el-button type="text" @click="showAddOutBound(scope.row)" size="small">
                        出库
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PageIndex" :page-sizes="[5, 10, 20, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="TotalCount">
            </el-pagination>
        </div>
        <el-dialog title="出库" :visible.sync="dialogVisible" width="30%">
            <el-form ref="form" label-width="80px">
                <el-form-item label="出库原因">
                    <el-select v-model="InOutReason.val" clearable placeholder="请选择入库原因" class="handle-select mr10" style=" width:80%;">
                        <el-option v-for="item in InOutReason.data" :key="item.Id" :label="item.Description" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出库数量">
                    <el-input v-model="Qty" type="number" style=" width:80%;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOutBound">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>

<script>
export default {
    data() {
        return {
            pagesize: 10,
            PageIndex: 1,
            TotalCount: 0,
            table: [],
            dialogVisible: false,
            InOutReason: {
                var: "",
                data: []
            },
            Qty: 0,
            WarehouseId: "",
            ProductId: ""
        };
    },
    activated() {
        this.initialization();
    },
    methods: {
        initialization() {
            this.getSpotInventory();
            this.getInOutReason();
        },
        handleSizeChange: function(size) {
            this.pagesize = size;
            this.getSpotInventory();
        },
        handleCurrentChange: function(PageIndex) {
            this.PageIndex = PageIndex;
            this.getSpotInventory();
        },
        getSpotInventory() {

            this.$http.get("/api/SpotInventory/GetSpotInventory", {
                        params: {
                            PageIndex: this.PageIndex,
                            PageSize: this.pagesize,
                            ProductId: "",
                            WarehouseId: ""
                        }
                    })
                    .then(res => {
                        this.table = res.data.EntityList;
                        this.TotalCount = res.data.TotalCount;
                        this.PageIndex = res.data.PageIndex;
                        console.log(res.data.EntityList);
                    });
        },
        getInOutReason() {
            this.$http.get("/api/InOutReason/GetOutReason", {}).then(res => {
                if (res.data.length > 0) {
                    this.InOutReason.data = res.data;
                    this.InOutReason.val = res.data[0].Id;
                    console.log(res.data);
                }
            });
        },
        showAddOutBound(row) {
            this.dialogVisible = true;
            this.WarehouseId = row.WarehouseId;
            this.ProductId = row.ProductId;
            console.log(row);
        },
        addOutBound() {
            this.$http
                .get("/api/InOutBound/AddOutBound", {
                    params: {
                        InOutReasonId: this.InOutReason.val,
                        WarehouseId: this.WarehouseId,
                        ProductId: this.ProductId,
                        Qty: this.Qty,
                        Note: "",
                        CreateUserId: "W001"
                    }
                })
                .then(res => {
                    this.dialogVisible = false;
                    this.Id = "";
                    this.getSpotInventory();
                });
        },
        inBound(){
            this.$router.push({ path: "addinbound", query: { parentid: this.id} });
        }
    }
};
</script>
 