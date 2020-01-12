<template>
    <div class="container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="待审批" name="first">
                <v-WaitApproval></v-WaitApproval>
            </el-tab-pane>
            <el-tab-pane label="已审批" name="second">
                <v-HaveApproval  v-bind:status="'PO-030'"></v-HaveApproval>
            </el-tab-pane>
            <el-tab-pane label="已驳回" name="third">
                <v-HaveApproval  v-bind:status="'PO-040'"></v-HaveApproval>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import vHaveApproval from "./ApprovalPurchaseHave";
import vWaitApproval from "./ApprovalPurchaseWait";

export default {
    data() {
        return {
            activeName: "first"
        };
    },
    components: {
        vHaveApproval,
        vWaitApproval
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
.container {
    padding: 5px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>
 