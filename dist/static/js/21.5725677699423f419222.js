webpackJsonp([21],{GF4k:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=t("mvHQ"),o=t.n(s),a={data:function(){return{ruleForm:{username:"",password:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{submitForm:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;r.$http.get("/api/Account/Login",{params:{LoginName:r.ruleForm.username,PassWord:r.ruleForm.password}}).then(function(e){var t=e.data,s=t.User,a=t.token;if(200==t.code){window.localStorage.setItem("ms_username",s.Id),window.localStorage.setItem("ms_userkey",a),window.localStorage.setItem("ms_usermenu",o()(s.Menu[0].children));var n=r.$route.query.redirect;n?r.$router.push(n):r.$router.push("/"),console.log("redirect"),console.log(n)}})})}}},n={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login-wrap"},[t("div",{staticClass:"ms-title"},[e._v("后台管理系统")]),e._v(" "),t("div",{staticClass:"ms-login"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"0px"}},[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"请输入密码"},nativeOn:{keyup:function(r){if(!("button"in r)&&e._k(r.keyCode,"enter",13,r.key,"Enter"))return null;e.submitForm("ruleForm")}},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),e._v(" "),t("div",{staticClass:"login-btn"},[t("el-button",{attrs:{type:"primary"},on:{click:function(r){e.submitForm("ruleForm")}}},[e._v("登录")])],1),e._v(" "),t("p",{staticStyle:{"font-size":"12px","line-height":"30px",color:"#999"}},[e._v("提示 : 请输入用户名和密码。")])],1)],1)])},staticRenderFns:[]};var l=t("VU/8")(a,n,!1,function(e){t("Jy86")},"data-v-0a12219a",null);r.default=l.exports},Jy86:function(e,r){}});