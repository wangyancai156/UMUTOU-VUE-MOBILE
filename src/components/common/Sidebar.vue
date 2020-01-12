<template>
  <div class="sidebar">
    <el-scrollbar style="height:100%;">
      <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items">
          <template v-if="item.children">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>
              <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
     
    data: function() {
        return {
            collapse: false,
             items: [
                /**
                {
                    icon: "el-icon-date",
                    index: "1",
                    title: "人事管理系统",
                    children: [
                        {
                            icon: "el-icon-setting",
                            index: "organization",
                            title: "组织架构"
                        },
                        {
                            icon: "el-icon-setting",
                            index: "user",
                            title: "员工列表"
                        },
                        {
                            icon: "el-icon-setting",
                            index: "role",
                            title: "角色列表"
                        },
                        {
                            icon: "el-icon-setting",
                            index: "rights",
                            title: "权限列表"
                        }
                    ]
                },
                {
                    icon: "el-icon-setting",
                    index: "2",
                    title: "库存管理系统",
                    children: [
                        {
                            icon: "el-icon-setting",
                            index: "spotinventory",
                            title: "现货库存"
                        },
                        {
                            icon: "el-icon-setting",
                            index: "addinbound",
                            title: "添加入库"
                        },
                        {
                            icon: "el-icon-setting",
                            index: "2222",
                            title: "待入库"
                        }
                    ]
                },
                {
                    icon: "el-icon-setting",
                    index: "3",
                    title: "采购系统",
                    children: [
                        {
                            icon: "el-icon-setting",
                            index: "mypurchaseorder",
                            title: "我的采购单"
                        },
                        {
                            icon: "el-icon-setting",
                            index: "approvalpurchase",
                            title: "采购单审批"
                        }
                    ]
                },
                {
                    icon: "el-icon-setting",
                    index: "4",
                    title: "系统设置",
                    children: [
                        {
                            icon: "el-icon-setting",
                            index: "table",
                            title: "库房维护"
                        },
                        {
                            icon: "el-icon-setting",
                            index: "table",
                            title: "发票类型维护"
                        },
                        {
                            icon: "el-icon-setting",
                            index: "table",
                            title: "采购类型维护"
                        }
                    ]
                },
                {
                    icon: "el-icon-setting",
                    index: "dashboard",
                    title: "系统首页"
                },
                {
                    icon: "el-icon-tickets",
                    index: "table",
                    title: "基础表格"
                },
                {
                    icon: "el-icon-message",
                    index: "tabs",
                    title: "tab选项卡"
                },
                {
                    icon: "el-icon-date",
                    index: "5",
                    title: "表单相关",
                    children: [
                        {
                            index: "form",
                            title: "基本表单"
                        },
                        {
                            index: "editor",
                            title: "富文本编辑器"
                        },
                        {
                            index: "markdown",
                            title: "markdown编辑器"
                        },
                        {
                            index: "upload",
                            title: "文件上传"
                        }
                    ]
                },
                {
                    icon: "el-icon-star-on",
                    index: "charts",
                    title: "schart图表"
                },
                {
                    icon: "el-icon-rank",
                    index: "drag",
                    title: "拖拽列表"
                },
                {
                    icon: "el-icon-warning",
                    index: "permission",
                    title: "权限测试"
                },
                {
                    icon: "el-icon-error",
                    index: "404",
                    title: "404页面"
                } 
                */
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "");
        }
    },
    created() {
       
        this.initialization();
    },
    methods: {

        initialization(){
            //获取菜单
            this.getMenu();
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on("collapse", msg => {
                this.collapse = msg;
            });
        },
        getMenu(){
            var usermenu = JSON.parse(window.localStorage.getItem('ms_usermenu'));
            this.items.length = 0;
            this.items = usermenu;
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    height: 100%;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
