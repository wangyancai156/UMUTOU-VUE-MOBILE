<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <span>产品</span>
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
          ></el-option>
        </el-select>数量
        <el-input v-model="Qty" type="number" style="width:100px;"></el-input>单价
        <el-input v-model="Price" type="number" style="width:100px;"></el-input>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">返回</el-button>
      </div>
      <el-table ref="list" @selection-change="selsChange" :data="table" style="width: 100%; ">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="Product.ChineseName" label="产品名称"></el-table-column>
        <el-table-column prop="UnitPrice" label="单价"></el-table-column>
        <el-table-column prop="Qty" label="数量"></el-table-column>
        <el-table-column prop="CreateDate" label="添加时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      purchaseOrderId: "",
      Product: {
        data: [],
        val: ""
      },
      Qty: 0,
      Price: 0,
      table: [], //用户数据
      sels: [] // 选中的数据
    };
  },
  activated() {
    this.initialization();
  },
  methods: {
    initialization() {
      this.purchaseOrderId = this.$route.query.model.Id;
      this.getProduct();
      this.getPurchaseOrderDetail();
    },
    getProduct() {
      this.$http.get("/api/Product/GetProductView", {}).then(res => {
        this.Product.data = res.data;
        this.Product.val = res.data[0].Id;
        console.log(res.data);
      });
    },
    getPurchaseOrderDetail() {
      this.$http
        .get("/api/PurchaseOrder/GetPurchaseOrderDetailView", {
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