(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04d86ddc"],{"4ef5":function(e,r,a){"use strict";a.r(r);var t=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"container d-flex"},[a("div",{staticClass:"setting-pannel"},[a("Navbar",{attrs:{"navbar-status":e.status}})],1),e.isLoading?a("Spinner"):a("div",{staticClass:"main-content"},[a("div",{staticClass:"header"},[a("p",[e._v("帳戶設定")])]),a("form",{staticClass:"form-group w-100",on:{submit:function(r){return r.stopPropagation(),r.preventDefault(),e.handleSubmit(e.UserId)}}},[a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"account"}},[e._v("帳號")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.account,expression:"userProfile.account"}],staticClass:"form-input form-control",attrs:{id:"account",name:"account",type:"account",placeholder:"",autocomplete:"account",required:"",autofocus:""},domProps:{value:e.userProfile.account},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"account",r.target.value)}}})]),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"name"}},[e._v("名稱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.name,expression:"userProfile.name"}],staticClass:"form-input form-control",attrs:{id:"name",name:"name",type:"text",placeholder:"",autocomplete:"username",required:"",autofocus:""},domProps:{value:e.userProfile.name},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"name",r.target.value)}}})]),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"email"}},[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.email,expression:"userProfile.email"}],staticClass:"form-input form-control",attrs:{id:"email",name:"email",type:"email",placeholder:"",autocomplete:"email",required:""},domProps:{value:e.userProfile.email},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"email",r.target.value)}}})]),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"password"}},[e._v("密碼")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.password,expression:"userProfile.password"}],staticClass:"form-input form-control",attrs:{id:"password",name:"password",type:"password",placeholder:"",autocomplete:"new-password",required:""},domProps:{value:e.userProfile.password},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"password",r.target.value)}}})]),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"password-check"}},[e._v("密碼確認")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.userProfile.checkPassword,expression:"userProfile.checkPassword"}],staticClass:"form-input form-control",attrs:{id:"password-check",name:"passwordCheck",type:"password",placeholder:"",autocomplete:"new-password",required:""},domProps:{value:e.userProfile.checkPassword},on:{input:function(r){r.target.composing||e.$set(e.userProfile,"checkPassword",r.target.value)}}})]),a("button",{staticClass:"btn btn-lg btn-submit btn-block mb-3",attrs:{type:"submit",disabled:e.isProcessing}},[e._v(" Submit ")])])])],1)},s=[],o=(a("b0c0"),a("96cf"),a("1da1")),i=a("d178"),n=a("2375"),c=a("4cce"),l=a("2fa3"),u={components:{Spinner:n["a"],Navbar:i["a"]},data:function(){return{isLoading:!0,status:"status3",userProfile:{account:"",name:"",email:"",password:"",passwordCheck:""},isProcessing:!1,UserId:""}},created:function(){var e=this.$route.params.id;this.fetchUserProfile(e)},methods:{fetchUserProfile:function(e){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var t,s,o,i,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,r.UserId=e,a.next=4,c["a"].UserProfile(e);case 4:t=a.sent,s=t.data,o=s.account,i=s.name,n=s.email,r.userProfile={account:o,name:i,email:n,password:"",checkPassword:""},r.isLoading=!1,a.next=16;break;case 11:a.prev=11,a.t0=a["catch"](0),r.isLoading=!1,r.isProcessing=!1,l["a"].fire({icon:"error",title:"無法更新使用者資訊，請稍後再試"});case 16:case"end":return a.stop()}}),a,null,[[0,11]])})))()},handleSubmit:function(e){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var t;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,r.isProcessing=!0,a.next=4,c["a"].UpdateUserSettingProfile(e,{account:r.userProfile.account,name:r.userProfile.name,email:r.userProfile.email,password:r.userProfile.password,checkPassword:r.userProfile.checkPassword});case 4:t=a.sent,console.log(t),r.$router.push({name:"main"}),a.next=13;break;case 9:a.prev=9,a.t0=a["catch"](0),r.isProcessing=!1,l["a"].fire({icon:"error",title:"無法更新使用者資訊，請稍後再試"});case 13:case"end":return a.stop()}}),a,null,[[0,9]])})))()}}},m=u,d=(a("cc64"),a("2877")),p=Object(d["a"])(m,t,s,!1,null,"07bb87b0",null);r["default"]=p.exports},"781e":function(e,r,a){},cc64:function(e,r,a){"use strict";a("781e")}}]);
//# sourceMappingURL=chunk-04d86ddc.560f7e52.js.map