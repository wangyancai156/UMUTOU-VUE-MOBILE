<template>
    <div class="container">
        <el-table
            :data="table"
            @selection-change="selsChange"
            style="width: 100%; "
        >
            <el-table-column
                type="selection"
                style="width: 5%; "
            ></el-table-column>
            <el-table-column
                prop="Id"
                label="采购编号"
                style="width: 30%; "
            ></el-table-column>
            <el-table-column
                prop="PurchaseType.Description"
                label="采购类型"
                style="width: 15%; "
            ></el-table-column>
            <el-table-column
                prop="Supplier.Name"
                label="供应商"
                style="width: 30%; "
            ></el-table-column>
            <el-table-column
                prop="PaymentType.Name"
                label="付款方案"
                style="width: 20%; "
            ></el-table-column>
            <el-table-column
                prop="CreateUser.UserName"
                label="请购人"
                style="width: 20%; "
            ></el-table-column>
            <el-table-column
                prop="CreateDate"
                label="操作时间"
                :formatter="dateFormat"
                style="width: 20%; "
            ></el-table-column>
            <el-table-column label="操作" style="width: 5%; ">
                <template slot-scope="scope">
                    <el-button type="text" size="small">
                        <span @click="showDetil(scope.row)">确认到货</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="PageIndex"
                :page-sizes="[5, 10, 20, 50, 100]"
                :page-size="Pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="TotalCount"
            ></el-pagination>
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
            status: "PO-030",
            table: []
        };
    },
    activated() {
        this.initialization();
    },
    methods: {
        //初始化
        initialization() {
            this.getPurchaseNoticeView();
        },
        //设置页数
        handleSizeChange: function(size) {
            this.Pagesize = size;
            this.getPurchaseNoticeView();
        },
        //翻页
        handleCurrentChange: function(PageIndex) {
            this.PageIndex = PageIndex;
            this.getPurchaseNoticeView();
        },
        //获取数据
        getPurchaseNoticeView() {
            this.$http
                .get("/api/PurchaseOrder/getPurchaseOrderViewByStatus", {
                    params: {
                        PageIndex: this.PageIndex,
                        PageSize: this.Pagesize,
                        StatuId: this.status
                    }
                })

                .then(res => {
                    this.table = res.data.EntityList;
                    this.TotalCount = res.data.TotalCount;
                    this.PageIndex = res.data.PageIndex;
                    console.log(res.data.EntityList);
                });
        },
        selsChange(sels) {
            //被选中的行组成数组
            this.sels = sels;
        },
        //打开入库明细
        showDetil(row) {
            this.$router.push({
                path: "/purchasereceiptdetail",
                query: { model: row }
            });
        },
        //格式化日期
        dateFormat: function(row, column) {
            var date = row[column.property];
            return this.DateFormat(date);
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
 