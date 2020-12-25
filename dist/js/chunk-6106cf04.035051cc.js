(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6106cf04"],{"42e8":function(t,e,a){"use strict";a("927e")},"927e":function(t,e,a){},be6c:function(t,e,a){"use strict";var n=a("2fa3"),r=function(){return localStorage.getItem("token")};e["a"]={users:{get:function(){return n["b"].get("/admin/users",{headers:{Authorization:"Bearer ".concat(r())}})}},tweets:{delete:function(t){var e=t.tweetId;return n["b"].delete("/admin/tweets/".concat(e),{headers:{Authorization:"Bearer ".concat(r())}})},get:function(){return n["b"].get("/admin/tweets",{headers:{Authorization:"Bearer ".concat(r())}})}}}},fa6a:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"main-app"}},[a("nav",{staticClass:"d-flex flex-column justify-content-between align-items-center"},[a("div",{staticClass:"top-items"},[t._m(0),t._m(1),a("router-link",{attrs:{to:"/admin/users"}},[a("div",{staticClass:"pannel-icon-container d-flex"},[a("img",{staticClass:"pannel-icon",attrs:{src:"/image/icon_profile.png",alt:"Profile"}}),a("h1",{staticClass:"pannel-icon-text"},[t._v("使用者列表")])])])],1),a("div",[a("div",{staticClass:"d-flex align-items-center",on:{click:t.logout}},[a("img",{staticClass:"pannel-icon m-3",attrs:{src:"/image/logout@2x.png",alt:"Index"}}),a("a",{staticClass:"text-center text-dark",attrs:{href:"#"}},[t._v("登出")])])])]),a("main",{attrs:{id:"main-content"}},[t._m(2),a("div",{staticClass:"card-wrapper"},t._l(t.tweets,(function(e){return a("div",{key:e.id,staticClass:"card"},[a("div",{staticClass:"user-avatar"},[a("img",{staticClass:"user-avatar",attrs:{src:e.User.avatar,alt:""}})]),a("div",{staticClass:"content"},[a("div",{staticClass:"detail"},[a("div",{staticClass:"name mr-1"},[t._v(t._s(e.User.name))]),a("div",{staticClass:"account mr-1"},[t._v(t._s(e.User.account))]),a("div",{staticClass:"creat-time"},[t._v(t._s(e.createdAt))])]),a("div",{staticClass:"tweet"},[t._v(" "+t._s(t._f("printString")(e.description))+" ")])]),a("div",{staticClass:"tweet-delete",on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.deleteTweets(e.id)}}},[t._v(" x ")])])})),0)])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"logo-container"},[a("img",{staticClass:"logo",attrs:{src:"/image/Logo.png",alt:"Logo"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pannel-icon-container chosen d-flex"},[a("img",{staticClass:"pannel-icon",attrs:{src:"/image/icon_index_orange.png",alt:"Index"}}),a("h1",{staticClass:"pannel-icon-text chosen"},[t._v("推文清單")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title"},[a("h4",[t._v("推文清單")])])}],s=(a("4de4"),a("fb6a"),a("96cf"),a("1da1")),i=a("be6c"),c=a("2fa3"),o={data:function(){return{tweets:[]}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i["a"].tweets.get();case 3:a=e.sent,n=a.data,t.tweets=n,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),c["a"].fire({icon:"error",title:"無法取得推文資料，請稍後再試"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},deleteTweets:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i["a"].tweets.delete({tweetId:t});case 3:if(n=a.sent,r=n.data,console.log(t),"success"===r.status){a.next=8;break}throw new Error(r.message);case 8:e.tweets=e.tweets.filter((function(e){return e.id!==t})),a.next=15;break;case 11:a.prev=11,a.t0=a["catch"](0),c["a"].fire({icon:"error",title:"無法將推文移除，請稍後再試"}),console.log("error",a.t0);case 15:case"end":return a.stop()}}),a,null,[[0,11]])})))()},logout:function(){this.$store.commit("revokeAuthentication"),this.$router.push("/admin/signin")}},filters:{printString:function(t){return t.slice(0,49)}}},l=o,u=(a("42e8"),a("2877")),d=Object(u["a"])(l,n,r,!1,null,"0918b424",null);e["default"]=d.exports},fb6a:function(t,e,a){"use strict";var n=a("23e7"),r=a("861d"),s=a("e8b5"),i=a("23cb"),c=a("50c4"),o=a("fc6a"),l=a("8418"),u=a("b622"),d=a("1dde"),f=a("ae40"),v=d("slice"),m=f("slice",{ACCESSORS:!0,0:0,1:2}),p=u("species"),g=[].slice,h=Math.max;n({target:"Array",proto:!0,forced:!v||!m},{slice:function(t,e){var a,n,u,d=o(this),f=c(d.length),v=i(t,f),m=i(void 0===e?f:e,f);if(s(d)&&(a=d.constructor,"function"!=typeof a||a!==Array&&!s(a.prototype)?r(a)&&(a=a[p],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return g.call(d,v,m);for(n=new(void 0===a?Array:a)(h(m-v,0)),u=0;v<m;v++,u++)v in d&&l(n,u,d[v]);return n.length=u,n}})}}]);
//# sourceMappingURL=chunk-6106cf04.035051cc.js.map