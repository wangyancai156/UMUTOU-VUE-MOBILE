webpackJsonp([22],{moOQ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={data:function(){return{purchaseOrderId:"",Product:{data:[],val:""},Qty:0,Price:0,table:[],sels:[]}},activated:function(){this.initialization()},methods:{initialization:function(){this.purchaseOrderId=this.$route.query.model.Id,this.getProduct(),this.getPurchaseOrderDetail()},getProduct:function(){var t=this;this.$http.get("/api/Product/GetProductView",{}).then(function(e){t.Product.data=e.data,t.Product.val=e.data[0].Id,console.log(e.data)})},getPurchaseOrderDetail:function(){var t=this;this.$http.get("/api/PurchaseOrder/GetPurchaseOrderDetailView",{params:{purchaseOrderId:this.purchaseOrderId}}).then(function(e){t.table=e.data,console.log(e.data)})},selsChange:function(t){this.sels=t},onSubmit:function(){var t=this;this.$http.get("/api/PurchaseOrder/AddPurchaseOrderDetail",{params:{PurchaseOrderId:this.purchaseOrderId,ProductId:this.Product.val,Qty:this.Qty,UnitPrice:this.Price,Note:"",CreateUserId:"W001"}}).then(function(e){t.getPurchaseOrderDetail()})},onCancel:function(){setTimeout(this.$router.push("mypurchaseorder"),1e3)}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("span",[t._v("产品")]),t._v(" "),a("el-select",{staticClass:"handle-select mr10",staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"请选择产品"},model:{value:t.Product.val,callback:function(e){t.$set(t.Product,"val",e)},expression:"Product.val"}},t._l(t.Product.data,function(t){return a("el-option",{key:t.Id,attrs:{label:t.ChineseName,value:t.Id}})})),t._v("数量\n      "),a("el-input",{staticStyle:{width:"100px"},attrs:{type:"number"},model:{value:t.Qty,callback:function(e){t.Qty=e},expression:"Qty"}}),t._v("单价\n      "),a("el-input",{staticStyle:{width:"100px"},attrs:{type:"number"},model:{value:t.Price,callback:function(e){t.Price=e},expression:"Price"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("添加")]),t._v(" "),a("el-button",{on:{click:t.onCancel}},[t._v("返回")])],1),t._v(" "),a("el-table",{ref:"list",staticStyle:{width:"100%"},attrs:{data:t.table},on:{"selection-change":t.selsChange}},[a("el-table-column",{attrs:{type:"selection"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Product.ChineseName",label:"产品名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"UnitPrice",label:"单价"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Qty",label:"数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"CreateDate",label:"添加时间"}})],1)],1)])},staticRenderFns:[]},i=a("VU/8")(r,l,!1,null,null,null);e.default=i.exports}});