(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12bc7e06"],{4016:function(e,r,t){},"4ef5":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"container d-flex"},[t("div",{staticClass:"setting-pannel"},[t("Navbar",{attrs:{"navbar-status":e.status}})],1),e.isLoading?t("Spinner"):t("div",{staticClass:"main-content"},[t("div",{staticClass:"header"},[t("p",[e._v("帳戶設定")])]),t("form",{staticClass:"form-group",on:{submit:function(r){return r.stopPropagation(),r.preventDefault(),e.handleSubmit(e.UserId)}}},[t("div",{staticClass:"form-label-group"},[t("label",{attrs:{for:"account"}},[e._v("帳號")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.account,expression:"userProfile.account"}],staticClass:"form-input form-control",attrs:{id:"account",name:"account",type:"account",placeholder:"",autocomplete:"account",required:"",autofocus:""},domProps:{value:e.userProfile.account},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"account",r.target.value)}}})]),t("div",{staticClass:"form-label-group"},[t("label",{attrs:{for:"name"}},[e._v("名稱")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.name,expression:"userProfile.name"}],staticClass:"form-input form-control",attrs:{id:"name",name:"name",type:"text",placeholder:"",autocomplete:"username",required:"",autofocus:""},domProps:{value:e.userProfile.name},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"name",r.target.value)}}})]),t("div",{staticClass:"form-label-group"},[t("label",{attrs:{for:"email"}},[e._v("Email")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.email,expression:"userProfile.email"}],staticClass:"form-input form-control",attrs:{id:"email",name:"email",type:"email",placeholder:"",autocomplete:"email",required:""},domProps:{value:e.userProfile.email},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"email",r.target.value)}}})]),t("div",{staticClass:"form-label-group"},[t("label",{attrs:{for:"password"}},[e._v("密碼")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.password,expression:"userProfile.password"}],staticClass:"form-input form-control",attrs:{id:"password",name:"password",type:"password",placeholder:"",autocomplete:"new-password",required:""},domProps:{value:e.userProfile.password},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"password",r.target.value)}}})]),t("div",{staticClass:"form-label-group"},[t("label",{attrs:{for:"password-check"}},[e._v("密碼確認")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.checkPassword,expression:"userProfile.checkPassword"}],staticClass:"form-input form-control",attrs:{id:"password-check",name:"passwordCheck",type:"password",placeholder:"",autocomplete:"new-password",required:""},domProps:{value:e.userProfile.checkPassword},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"checkPassword",r.target.value)}}})]),t("button",{staticClass:"btn btn-lg btn-submit btn-block mb-3",attrs:{type:"submit",disabled:e.isProcessing}},[e._v(" Submit ")])])])],1)},s=[],o=(t("b0c0"),t("96cf"),t("1da1")),i=t("d178"),n=t("2375"),c=t("4cce"),u=t("2fa3"),l={components:{Spinner:n["a"],Navbar:i["a"]},created:function(){var e=this.$route.params.id;this.fetchUserProfile(e)},data:function(){return{isLoading:!0,status:"status3",userProfile:{account:"",name:"",email:"",password:"",passwordCheck:""},isProcessing:!1,UserId:""}},methods:{fetchUserProfile:function(e){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,s,o,i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r.UserId=e,t.next=4,c["a"].UserProfile(e);case 4:a=t.sent,s=a.data,o=s.account,i=s.name,n=s.email,r.userProfile={account:o,name:i,email:n,password:"",checkPassword:""},r.isLoading=!1,t.next=16;break;case 11:t.prev=11,t.t0=t["catch"](0),r.isLoading=!1,r.isProcessing=!1,u["a"].fire({icon:"error",title:"無法更新使用者資訊，請稍後再試"});case 16:case"end":return t.stop()}}),t,null,[[0,11]])})))()},handleSubmit:function(e){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r.isProcessing=!0,t.next=4,c["a"].UpdateUserSettingProfile(e,{account:r.userProfile.account,name:r.userProfile.name,email:r.userProfile.email,password:r.userProfile.password,checkPassword:r.userProfile.checkPassword});case 4:a=t.sent,"success"!==a.status&&u["a"].fire({icon:"info",title:"已更新完使用者資訊，正在轉回主頁～"}),r.$router.push({name:"main"}),t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](0),r.isProcessing=!1,u["a"].fire({icon:"error",title:"無法更新使用者資訊，請稍後再試"});case 13:case"end":return t.stop()}}),t,null,[[0,9]])})))()}},directives:{focus:{inserted:function(e){e.focus()}}}},m=l,d=(t("4fe7"),t("2877")),p=Object(d["a"])(m,a,s,!1,null,"4d99c656",null);r["default"]=p.exports},"4fe7":function(e,r,t){"use strict";t("4016")}}]);
//# sourceMappingURL=chunk-12bc7e06.9c48d407.js.map