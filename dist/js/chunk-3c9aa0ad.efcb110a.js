(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c9aa0ad"],{"2f41":function(t,e,a){"use strict";a("4c17")},"4c17":function(t,e,a){},6135:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"main-app"}},[a("nav",{staticClass:"d-flex flex-column justify-content-between align-items-center"},[a("div",{staticClass:"top-items"},[t._m(0),a("router-link",{attrs:{to:"/admin/tweets"}},[a("div",{staticClass:"pannel-icon-container chosen d-flex"},[a("img",{staticClass:"pannel-icon",attrs:{src:"/image/icon_index.png",alt:"Index"}}),a("h1",{staticClass:"pannel-icon-text"},[t._v("推文清單")])])]),t._m(1)],1),t._m(2)]),a("main",{attrs:{id:"main-content"}},[t._m(3),a("div",{staticClass:"card-list-panel d-flex justify-content-start"},[a("div",{staticClass:"user-list"},t._l(t.sortData,(function(e){return a("div",{key:e.tweetCount,staticClass:"card"},[a("div",{staticClass:"user-cover"},[a("img",{staticClass:"user-cover",attrs:{src:e.cover}})]),a("div",{staticClass:"avatar"},[a("img",{staticClass:"user-avatar",attrs:{src:e.avatar,alt:""}})]),a("div",{staticClass:"user-info"},[a("p",{staticClass:"name"},[t._v(t._s(e.name))]),a("p",{staticClass:"account"},[t._v(t._s(e.account))]),a("div",{staticClass:"user-detail"},[a("div",{staticClass:"d-flex align-items-center mr-2"},[a("img",{staticClass:"profile_icon",attrs:{src:"/image/like_icon.png",alt:""}}),a("p",[t._v(t._s(e.LikedCount))])]),a("div",{staticClass:"d-flex align-items-center mr-2"},[a("img",{staticClass:"profile_icon",attrs:{src:"/image/reply_icon.png",alt:""}}),a("p",[t._v(t._s(e.tweetCount))])])]),a("div",{staticClass:"user-detail"},[a("p",[t._v(t._s(e.followingCount)+"個 "),a("span",[t._v("跟隨中")])]),a("p",[t._v(t._s(e.followerCount)+"位 "),a("span",[t._v("跟隨者")])])])])])})),0)])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"logo-container"},[a("img",{staticClass:"logo",attrs:{src:"/image/Logo.png",alt:"Logo"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pannel-icon-container d-flex"},[a("img",{staticClass:"pannel-icon",attrs:{src:"/image/icon_profile_orange.png",alt:"Profile"}}),a("h1",{staticClass:"pannel-icon-text chosen"},[t._v("使用者列表")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"d-flex align-items-center"},[a("img",{staticClass:"pannel-icon m-3",attrs:{src:"/image/logout@2x.png",alt:"Index"}}),a("a",{staticClass:"text-center text-dark",attrs:{href:"#"}},[t._v("登出")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title"},[a("h4",[t._v("使用者列表")])])}],i=(a("96cf"),a("1da1")),r=a("be6c"),c=a("2fa3"),o={data:function(){return{users:[],sortType:"tweetCount"}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r["a"].users.get();case 3:a=e.sent,s=a.data,t.users=s,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),c["a"].fire({icon:"error",title:"無法取得使用者資料，請稍後再試"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}},computed:{sortData:function(){var t=this,e=t.sortType,a=t.users.sort((function(t,a){return t=t[e],a=a[e],a-t}));return a}}},l=o,u=(a("2f41"),a("2877")),d=Object(u["a"])(l,s,n,!1,null,"bae8e040",null);e["default"]=d.exports},be6c:function(t,e,a){"use strict";var s=a("2fa3"),n=function(){return localStorage.getItem("token")};e["a"]={users:{get:function(){return s["b"].get("/admin/users",{headers:{Authorization:"Bearer ".concat(n())}})}},tweets:{delete:function(t){var e=t.tweetId;return s["b"].delete("/admin/tweets/".concat(e),{headers:{Authorization:"Bearer ".concat(n())}})},get:function(){return s["b"].get("/admin/tweets",{headers:{Authorization:"Bearer ".concat(n())}})}}}}}]);
//# sourceMappingURL=chunk-3c9aa0ad.efcb110a.js.map