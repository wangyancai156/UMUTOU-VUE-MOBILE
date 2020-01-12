<template>
    <div class="container">
        <div class="handle-box">
            <el-button
                type="danger"
                icon="delete"
                class="handle-del mr10"
                @click="removePurchaseOrder()"
            >
                批量删除</el-button
            >
            <el-select
                v-model="Status.val"
                filterable
                placeholder="选择状态"
                class="handle-select mr10"
            >
                <el-option
                    v-for="item in Status.data"
                    :key="item.Id"
                    :label="item.text"
                    :value="item.Id"
                ></el-option>
            </el-select>
            <el-button
                type="primary"
                icon="search"
                @click="getPurchaseOrderView"
                >搜索</el-button
            >
            <el-button
                type="primary"
                icon="delete"
                @click="addPurchaseOrder"
                class="handle-del mr10"
                >添加采购单</el-button
            >
        </div>
        <el-table
            :data="table"
            @selection-change="selsChange"
            style="width: 100%; "
        >
            <el-table-column type="selection" style="width: 5%; ">
            </el-table-column>
            <el-table-column prop="Id" label="采购编号" style="width: 30%; ">
            </el-table-column>
            <el-table-column
                prop="PurchaseType.Description"
                label="采购类型"
                style="width: 15%; "
            >
            </el-table-column>
            <el-table-column
                prop="Supplier.Name"
                label="供应商"
                style="width: 30%; "
            >
            </el-table-column>
            <el-table-column
                prop="PaymentType.Name"
                label="付款方案"
                style="width: 20%; "
            >
            </el-table-column>
            <el-table-column
                prop="CreateUser.UserName"
                label="申请人"
                style="width: 20%; "
            >
            </el-table-column>
            <el-table-column
                prop="CreateDate"
                label="操作时间"
                style="width: 20%; "
            >
            </el-table-column>
            <el-table-column label="操作" style="width: 5%; ">
                <template slot-scope="scope">
                    <el-button type="text" size="small">
                        <span @click="addPurchaseOrderDetail(scope.row)">
                            明细
                        </span>
                        <span @click="purchaseApply(scope.row)"> 提交 </span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="PageIndex"
                :page-sizes="[5, 10, 20, 100]"
                :page-size="Pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="TotalCount"
            >
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
            Status: {
                val: "PO-010",
                data: [
                    { Id: "PO-010", text: "待提交" },
                    { Id: "PO-020", text: "待审批" },
                    { Id: "PO-030", text: "待到货" }
                ]
            }
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
            const operatorId = window.localStorage.getItem("ms_username");
            this.$http
                .get("/api/PurchaseOrder/getPurchaseOrderViewByStatus", {
                    params: {
                        PageIndex: this.PageIndex,
                        PageSize: this.Pagesize,
                        StatuId: this.Status.val,
                        OperatorId: operatorId
                    }
                })
                .then(res => {
                    let { EntityList, TotalCount, PageIndex } = res.data;
                    console.log(EntityList);
                    this.table = EntityList;
                    this.TotalCount = TotalCount;
                    this.PageIndex = PageIndex;
                });
        },
        selsChange(sels) {
            //被选中的行组成数组
            this.sels = sels;
        },
        addPurchaseOrder() {
            this.$router.push("addpurchaseorder");
        },
        removePurchaseOrder() {
            var ids = "";
            this.sels.forEach(element => {
                ids = ids + "|" + element.Id;
            });
            this.$http
                .get("/api/PurchaseOrder/RemovePurchaseOrder", {
                    params: {
                        id: ids
                    }
                })
                .then(res => {
                    this.getPurchaseOrderView();
                });
        },
        addPurchaseOrderDetail(row) {
            this.$router.push({
                path: "/addpurchaseorderdetail",
                query: {
                    model: row
                }
            });
        },
        purchaseApply(row) {
            const operatorId = window.localStorage.getItem("ms_username");
            this.$http
                .get("/api/PurchaseOrder/PurchaseApply", {
                    params: {
                        id: row.Id,
                        operatorId: operatorId
                    }
                })
                .then(res => {
                    console.log(res.data);
                    if (res.data == true) {
                        alert("已提交！");
                        this.getPurchaseOrderView();
                    } else {
                        alert("提交失败！");
                    }
                });
        },
        dateFormat: function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return date.substring(0, 10);
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
 