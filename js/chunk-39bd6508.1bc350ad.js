(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39bd6508"],{6135:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"main-app"}},[s("nav",{staticClass:"d-flex flex-column justify-content-between align-items-center"},[s("div",{staticClass:"top-items"},[t._m(0),s("router-link",{attrs:{to:"/admin/tweets"}},[s("div",{staticClass:"pannel-icon-container chosen d-flex"},[s("img",{staticClass:"pannel-icon",attrs:{src:"https://upload.cc/i1/2020/12/24/N9vPcY.png",alt:"Index"}}),s("h1",{staticClass:"pannel-icon-text"},[t._v("推文清單")])])]),t._m(1)],1),s("div",[s("div",{staticClass:"d-flex align-items-center",on:{click:t.logout}},[s("img",{staticClass:"pannel-icon m-3",attrs:{src:"https://upload.cc/i1/2020/12/24/6SJqIC.png",alt:"Index"}}),s("a",{staticClass:"text-center text-dark",attrs:{href:"#"}},[t._v("登出")])])])]),s("main",{attrs:{id:"main-content"}},[t._m(2),s("div",{staticClass:"card-list-panel d-flex justify-content-start"},[s("div",{staticClass:"user-list"},t._l(t.sortData,(function(e){return s("div",{key:e.tweetCount,staticClass:"card"},[s("div",{staticClass:"user-cover"},[s("img",{staticClass:"user-cover",attrs:{src:e.cover}})]),s("div",{staticClass:"avatar"},[s("img",{staticClass:"user-avatar",attrs:{src:e.avatar,alt:""}})]),s("div",{staticClass:"user-info"},[s("p",{staticClass:"name"},[t._v(t._s(e.name))]),s("p",{staticClass:"account"},[t._v(t._s(e.account))]),s("div",{staticClass:"user-detail"},[s("div",{staticClass:"d-flex align-items-center mr-2"},[s("img",{staticClass:"profile_icon",attrs:{src:"https://upload.cc/i1/2020/12/24/XL7fKH.png",alt:""}}),s("p",[t._v(t._s(e.LikedCount))])]),s("div",{staticClass:"d-flex align-items-center mr-2"},[s("img",{staticClass:"profile_icon",attrs:{src:"https://upload.cc/i1/2020/12/24/xfD6YV.png",alt:""}}),s("p",[t._v(t._s(e.tweetCount))])])]),s("div",{staticClass:"user-detail"},[s("p",[t._v(t._s(e.followingCount)+"個 "),s("span",[t._v("跟隨中")])]),s("p",[t._v(t._s(e.followerCount)+"位 "),s("span",[t._v("跟隨者")])])])])])})),0)])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"logo-container"},[s("img",{staticClass:"logo",attrs:{src:"https://upload.cc/i1/2020/12/24/MLqwE5.png",alt:"Logo"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pannel-icon-container d-flex"},[s("img",{staticClass:"pannel-icon",attrs:{src:"https://upload.cc/i1/2020/12/24/RFLOhD.png",alt:"Profile"}}),s("h1",{staticClass:"pannel-icon-text chosen"},[t._v("使用者列表")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"title"},[s("h4",[t._v("使用者列表")])])}],i=(s("96cf"),s("1da1")),c=s("be6c"),r=s("2fa3"),o={data:function(){return{users:[],sortType:"tweetCount"}},created:function(){this.fetchData()},methods:{logout:function(){this.$store.commit("revokeAuthentication"),this.$router.push("/admin/signin")},fetchData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var s,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c["a"].users.get();case 3:s=e.sent,a=s.data,t.users=a,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),r["a"].fire({icon:"error",title:"無法取得使用者資料，請稍後再試"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}},computed:{sortData:function(){var t=this,e=t.sortType,s=t.users.sort((function(t,s){return t=t[e],s=s[e],s-t}));return s}}},l=o,u=(s("ab38"),s("2877")),d=Object(u["a"])(l,a,n,!1,null,"94cfe074",null);e["default"]=d.exports},ab38:function(t,e,s){"use strict";s("d133")},be6c:function(t,e,s){"use strict";var a=s("2fa3"),n=function(){return localStorage.getItem("token")};e["a"]={users:{get:function(){return a["b"].get("/admin/users",{headers:{Authorization:"Bearer ".concat(n())}})}},tweets:{delete:function(t){var e=t.tweetId;return a["b"].delete("/admin/tweets/".concat(e),{headers:{Authorization:"Bearer ".concat(n())}})},get:function(){return a["b"].get("/admin/tweets",{headers:{Authorization:"Bearer ".concat(n())}})}}}},d133:function(t,e,s){}}]);
//# sourceMappingURL=chunk-39bd6508.1bc350ad.js.map