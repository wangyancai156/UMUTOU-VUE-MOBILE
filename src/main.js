import Vue from 'vue';
import App from './App';
import apiConfig from '../config/api.config'
import Axios from 'axios';
import VueAxios from 'vue-axios';
import './assets/iconfont/iconfont.css'; //iconfont 图标
import Vuex from 'vuex'
//Axios.defaults.withCredentials = false;

import router from './router'; //路由
import VueRouter from 'vue-router'; // VUE 路由
import ElementUI from 'element-ui'; //ui
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import "babel-polyfill";
import { post, fetch, patch, put } from './api/htttpk';
//import a from './api/axios';
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

//Vue.use(a)
Vue.use(VueAxios, Axios);
Axios.defaults.baseURL = apiConfig.baseUrl;
Axios.defaults.timeout = 50000;
Vue.use(Vuex)
Vue.use(VueRouter);
Vue.use(ElementUI, { size: 'small' });

import common from './components/common.js'
Vue.use(common);


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {

    const username = window.localStorage.getItem('ms_username');
    const userkey = window.localStorage.getItem('ms_userkey');
    if ((!username || !userkey) && to.path !== '/login') {
        console.log("无钥匙");
        next('/login');
    } else {

        next();
        //以下功能可以通过axios.interceptors.response.use  拦截器来实现；
        /** 
        if (to.path == '/login') {
            next();
        } else {
            Axios.get("/api/Account/Verification", {
                params: {
                    UserId: username,
                    Userkey: userkey
                }
            }).then(res => {

                if (!res.data && to.path !== '/login') {
                    console.log("错误");
                    next('/login');
                } else {

                    console.log("正确");
                    next();
                }
            });
        }*/

    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');