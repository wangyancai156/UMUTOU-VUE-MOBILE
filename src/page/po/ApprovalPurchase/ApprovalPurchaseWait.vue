<template>
    <div class="container">
        <el-table :data="table" style="width: 100%; ">
            <el-table-column type="selection" style="width: 5%; ">
            </el-table-column>
            <el-table-column prop="PurchaseType.Description" label="采购类型" style="width: 20%; ">
            </el-table-column>
            <el-table-column prop="Supplier.Name" label="供应商" style="width: 30%; ">
            </el-table-column>
            <el-table-column prop="PaymentType.Name" label="付款方案" style="width: 20%; ">
            </el-table-column>
            <el-table-column prop="CreateUser.UserName" label="申请人" style="width: 20%; ">
            </el-table-column>
            <el-table-column prop="CreateDate" label="操作时间" :formatter="dateFormat" style="width: 20%; ">
            </el-table-column>
            <el-table-column label="操作" style="width: 5%; ">
                <template slot-scope="scope">
                    <el-button type="text" size="small">
                        <span @click="onPurchaseApproval(scope.row)"> 批准 </span>
                        <span @click="onPurchaseReject(scope.row)"> 驳回 </span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PageIndex" :page-sizes="[5, 10, 20, 100]" :page-size="Pagesize" layout="total, sizes, prev, pager, next, jumper" :total="TotalCount">
            </el-pagination>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            Pagesize: 10,
            PageIndex: 1,
            TotalCount: 0,
            table: [],
            status: "PO-020"
        };
    },
    activated() {
        this.initialization();
    },
    methods: {
        initialization() {
            this.getPurchaseOrderView();
        },
        handleSizeChange: function(size) {
            this.Pagesize = size;
            this.getPurchaseOrderView();
        },
        handleCurrentChange: function(PageIndex) {
            this.PageIndex = PageIndex;
            this.getPurchaseOrderView();
        },
        getPurchaseOrderView() {
            this.$http
                .get("/api/PurchaseOrder/getPurchaseOrderViewByStatus", {
                    params: {
                        PageIndex: this.PageIndex,
                        PageSize: this.Pagesize,
                        StatuId: this.status,
                        OperatorId: "W001"
                    }
                })
                .then(res => {
                    this.table = res.data.EntityList;
                    this.TotalCount = res.data.TotalCount;
                    this.PageIndex = res.data.PageIndex;
                    console.log(res.data.EntityList);
                });
        },
        onPurchaseApproval(row) {

            const operatorId = window.localStorage.getItem('ms_username');
            this.$http
                .get("/api/PurchaseOrder/PurchaseApproval", {
                    params: {
                        id: row.Id,
                        operatorId: operatorId
                    }
                })
                .then(res => {
                    this.getPurchaseOrderView();
                });
        },
        onPurchaseReject(row) {

            const operatorId = window.localStorage.getItem('ms_username');
            this.$http
                .get("/api/PurchaseOrder/PurchaseReject", {
                    params: {
                        id: row.Id,
                        operatorId: operatorId
                    }
                })
                .then(res => {
                    this.getPurchaseOrderView();
                });
        },
        dateFormat: function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return date.substring(0,10);
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
 