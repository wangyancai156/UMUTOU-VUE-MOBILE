import Vue from 'vue';
import Router from 'vue-router';
import App from '../App';

Vue.use(Router);

const home = r =>
    require.ensure([], () => r(require('@/components/common/Home')), 'home');
//组织机构
const organization = r =>
    require.ensure(
        [],
        () => r(require('@/page/hr/organization/Organization')),
        'organization'
    );
const addorganization = r =>
    require.ensure(
        [],
        () => r(require('@/page/hr/organization/AddOrganization')),
        'addorganization'
    );
const editorganization = r =>
    require.ensure(
        [],
        () => r(require('@/page/hr/organization/EditorOrganization')),
        'editorganization'
    );
//岗位
const role = r =>
    require.ensure([], () => r(require('@/page/hr/role/Role')), 'role');
const addrole = r =>
    require.ensure([], () => r(require('@/page/hr/role/AddRole')), 'addrole');
const editrole = r =>
    require.ensure([], () => r(require('@/page/hr/role/EditRole')), 'editrole');

//权限
const rights = r =>
    require.ensure([], () => r(require('@/page/hr/rights/Rights')), 'rights');
const addrights = r =>
    require.ensure(
        [],
        () => r(require('@/page/hr/rights/AddRights')),
        'addrights'
    );
const editrights = r =>
    require.ensure(
        [],
        () => r(require('@/page/hr/rights/EditRights')),
        'editrights'
    );
//用户
const user = r =>
    require.ensure([], () => r(require('@/page/hr/user/User')), 'user');
const adduser = r =>
    require.ensure([], () => r(require('@/page/hr/user/AddUser')), 'adduser');
const editruser = r =>
    require.ensure(
        [],
        () => r(require('@/page/hr/user/EditUser')),
        'editruser'
    );
//库存
const inoutbound = r =>
    require.ensure([], () => r(require('@/page/bw/InOutBound')), 'inoutbound');
const spotinventory = r =>
    require.ensure(
        [],
        () => r(require('@/page/bw/SpotInventory')),
        'spotinventory'
    );
const addinbound = r =>
    require.ensure([], () => r(require('@/page/bw/AddInBound')), 'addinbound');
const purchasereceipt = r =>
    require.ensure(
        [],
        () => r(require('@/page/bw/PurchaseReceipt')),
        'purchasereceipt'
    );

const purchasereceiptdetail = r =>
    require.ensure(
        [],
        () => r(require('@/page/bw/PurchaseReceiptDetail')),
        'purchasereceiptdetail'
    );

//采购
const mypurchaseorder = r =>
    require.ensure(
        [],
        () => r(require('@/page/po/MyPurchaseOrder')),
        'mypurchaseorder'
    );
const addpurchaseorder = r =>
    require.ensure(
        [],
        () => r(require('@/page/po/AddPurchaseOrder')),
        'addpurchaseorder'
    );
const addpurchaseorderdetail = r =>
    require.ensure(
        [],
        () => r(require('@/page/po/AddPurchaseOrderDetail')),
        'addpurchaseorderdetail'
    );
const approvalpurchase = r =>
    require.ensure(
        [],
        () => r(require('@/page/po/ApprovalPurchase/ApprovalPurchase')),
        'approvalpurchase'
    );

export default new Router({
    routes: [
        {
            path: '/',
            component: App, //顶层路由，对应index.html
            children: [
                //二级路由。对应App.vue
                {
                    //地址为空时跳转inoutbound页面
                    path: '/',
                    redirect: '/organization'
                },
                {
                    //home包含页面格局，所有的业务操作都在这里处理
                    path: '/home',
                    component: home,
                    meta: { title: '系统首页' },
                    children: [
                        {
                            path: '/organization',
                            name: organization,
                            component: organization,
                            meta: { title: '组织架构' }
                        },
                        {
                            path: '/addorganization',
                            component: addorganization,
                            meta: { title: '新建组织' }
                        },
                        {
                            path: '/editorganization',
                            component: editorganization,
                            meta: { title: '编辑组织' }
                        },
                        {
                            path: '/user',
                            component: user,
                            meta: { title: '员工列表' }
                        },
                        {
                            path: '/adduser',
                            component: adduser,
                            meta: { title: '新建员工' }
                        },
                        {
                            path: '/editruser',
                            component: editruser,
                            meta: { title: '编辑员工' }
                        },
                        {
                            path: '/rights',
                            component: rights,
                            meta: { title: '权限列表' }
                        },
                        {
                            path: '/addrights',
                            name: 'addRights',
                            component: addrights,
                            meta: { title: '添加权限' }
                        },
                        {
                            path: '/editrights',
                            name: 'editrights',
                            component: editrights,
                            meta: { title: '编辑权限' }
                        },
                        {
                            path: '/role',
                            component: role,
                            meta: { title: '角色列表' }
                        },
                        {
                            path: '/addrole',
                            component: addrole,
                            meta: { title: '添加角色' }
                        },
                        {
                            path: '/editrole',
                            component: editrole,
                            meta: { title: '编辑角色' }
                        },
                        {
                            path: '/spotinventory',
                            component: spotinventory,
                            meta: { title: '现货库存' }
                        },
                        {
                            path: '/addinbound',
                            component: addinbound,
                            meta: { title: '添加入库' }
                        },
                        {
                            path: '/purchasereceipt',
                            component: purchasereceipt,
                            meta: { title: '待到货' }
                        },
                        {
                            path: '/purchasereceiptdetail',
                            component: purchasereceiptdetail,
                            meta: { title: '待到货明细' }
                        },
                        {
                            path: '/mypurchaseorder',
                            component: mypurchaseorder,
                            meta: { title: '我的采购单' }
                        },
                        {
                            path: '/addpurchaseorder',
                            component: addpurchaseorder,
                            meta: { title: '添加采购单' }
                        },
                        {
                            path: '/addpurchaseorderdetail',
                            component: addpurchaseorderdetail,
                            meta: { title: '添加采购明细' }
                        },
                        {
                            path: '/approvalpurchase',
                            component: approvalpurchase,
                            meta: { title: '采购审批' }
                        }, /////////////////////////////////////////
                        {
                            path: '/dashboard',
                            component: resolve =>
                                require([
                                    '../components/page/Dashboard.vue'
                                ], resolve),
                            meta: { title: '系统首页' }
                        },
                        {
                            path: '/table',
                            component: resolve =>
                                require([
                                    '../components/page/BaseTable.vue'
                                ], resolve),
                            meta: { title: '基础表格' }
                        },
                        {
                            path: '/tabs',
                            component: resolve =>
                                require([
                                    '../components/page/Tabs.vue'
                                ], resolve),
                            meta: { title: 'tab选项卡' }
                        },
                        {
                            path: '/form',
                            component: resolve =>
                                require([
                                    '../components/page/BaseForm.vue'
                                ], resolve),
                            meta: { title: '基本表单' }
                        },
                        {
                            // 富文本编辑器组件
                            path: '/editor',
                            component: resolve =>
                                require([
                                    '../components/page/VueEditor.vue'
                                ], resolve),
                            meta: { title: '富文本编辑器' }
                        },
                        {
                            // markdown组件
                            path: '/markdown',
                            component: resolve =>
                                require([
                                    '../components/page/Markdown.vue'
                                ], resolve),
                            meta: { title: 'markdown编辑器' }
                        },
                        {
                            // 图片上传组件
                            path: '/upload',
                            component: resolve =>
                                require([
                                    '../components/page/Upload.vue'
                                ], resolve),
                            meta: { title: '文件上传' }
                        },
                        {
                            // vue-schart组件
                            path: '/charts',
                            component: resolve =>
                                require([
                                    '../components/page/BaseCharts.vue'
                                ], resolve),
                            meta: { title: 'schart图表' }
                        },
                        {
                            // 拖拽列表组件
                            path: '/drag',
                            component: resolve =>
                                require([
                                    '../components/page/DragList.vue'
                                ], resolve),
                            meta: { title: '拖拽列表' }
                        },
                        {
                            // 权限页面
                            path: '/permission',
                            component: resolve =>
                                require([
                                    '../components/page/Permission.vue'
                                ], resolve),
                            meta: { title: '权限测试', permission: true }
                        }
                    ]
                },
                {
                    path: '/login',
                    component: resolve =>
                        require(['../components/page/Login.vue'], resolve)
                },
                {
                    path: '/404',
                    component: resolve =>
                        require(['../components/page/404.vue'], resolve)
                },
                {
                    path: '/403',
                    component: resolve =>
                        require(['../components/page/403.vue'], resolve)
                },
                {
                    path: '*',
                    redirect: '/404'
                }
            ]
        }
    ]
});
