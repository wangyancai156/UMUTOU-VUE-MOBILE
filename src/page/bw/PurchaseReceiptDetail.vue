<template>
  <div>
    <el-table ref="list" @selection-change="selsChange" :data="table" style="width: 100%; ">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="Product.ChineseName" label="产品名称"></el-table-column>
      <el-table-column prop="Qty" label="数量"></el-table-column>
      <el-table-column prop="1" label="到货量">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.Qty"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="CreateDate" label="添加时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      purchaseOrderId: "",
      Pagesize: 10,
      PageIndex: 1,
      TotalCount: 0,
      table: []
    };
  },
  activated() {
    this.initialization();
  },
  methods: {
    initialization() {
      this.purchaseOrderId = this.$route.query.model.Id;
      this.getPurchaseOrderDetail();
    },
    getPurchaseOrderDetail() {
      this.$http
        .get("/api/PurchaseReceipt/GetPurchaseReceiptDetailView", {
          params: {
            purchaseOrderId: this.purchaseOrderId
          }
        })
        .then(res => {
          this.table = res.data;
          console.log(res.data);
        });
    },
    selsChange(sels) {
      //被选中的行组成数组
      this.sels = sels;
    },
    onSubmit() {
      this.$http
        .get("/api/PurchaseOrder/AddPurchaseOrderDetail", {
          params: {
            PurchaseOrderId: this.purchaseOrderId,
            ProductId: this.Product.val,
            Qty: this.Qty,
            UnitPrice: this.Price,
            Note: "",
            CreateUserId: "W001"
          }
        })
        .then(res => {
          this.getPurchaseOrderDetail();
        });
    },
    onCancel() {
      setTimeout(this.$router.push("mypurchaseorder"), 1000);
    }
  }
};
</script>