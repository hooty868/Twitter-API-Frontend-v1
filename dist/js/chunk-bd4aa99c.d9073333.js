(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bd4aa99c"],{"0687":function(e,t,n){},1602:function(e,t,n){"use strict";var r=n("2fa3"),o=function(){return localStorage.getItem("token")};t["a"]={getUser:function(e){return r["b"].get("/users/".concat(e),{headers:{Authorization:"Bearer ".concat(o())}})},getTweets:function(e){return r["b"].get("/users/".concat(e,"/tweets"),{headers:{Authorization:"Bearer ".concat(o())}})},getLikes:function(e){return r["b"].get("/users/".concat(e,"/likes"),{headers:{Authorization:"Bearer ".concat(o())}})},getReply:function(e){return r["b"].get("/users/".concat(e,"/replied_tweets"),{headers:{Authorization:"Bearer ".concat(o())}})},getFollower:function(e){return r["b"].get("/users/".concat(e,"/followers"),{headers:{Authorization:"Bearer ".concat(o())}})},getFollowing:function(e){return r["b"].get("/users/".concat(e,"/followings"),{headers:{Authorization:"Bearer ".concat(o())}})},addFollowing:function(e){return r["b"].post("/followships",{id:e},{headers:{Authorization:"Bearer ".concat(o())}})},deleteFollowing:function(e){return r["b"].delete("/followships/".concat(e),{headers:{Authorization:"Bearer ".concat(o())}})},update:function(e){var t=e.userId,n=e.formData;return r["b"].put("/users/".concat(t),n,{headers:{Authorization:"Bearer ".concat(o())}})}}},"3ebe":function(e,t,n){},"45b5d":function(e,t,n){},"5c2c":function(e,t,n){"use strict";n("3ebe")},8793:function(e,t,n){"use strict";n("0687")},e420:function(e,t,n){"use strict";n("45b5d")},f5da:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"row h-100"},[n("div",{staticClass:"setting-pannel col-3 h-100"},[n("Navbar")],1),n("div",{staticClass:"main-content col h-100"},[n("div",{staticClass:"header pl-3"},[n("img",{attrs:{src:"https://upload.cc/i1/2020/12/24/oBeWkX.png",alt:""},on:{click:function(t){return e.$router.back()}}}),n("div",{staticClass:"header-content"},[n("p",{staticClass:"name"},[e._v(e._s(e.user.name))]),n("p",{staticClass:"twitter"},[e._v(e._s(e.user.tweetCount)+"推文")])])]),n("div",{staticClass:"user-tweet"},[n("div",{staticClass:"content-control d-flex"},[n("div",{staticClass:"tweets content",class:{active:e.showContent.follower},on:{click:function(t){return e.showfollower()}}},[e._v(" 跟隨者 ")]),n("div",{staticClass:"response content",class:{active:e.showContent.following},on:{click:function(t){return e.showfollowing()}}},[e._v(" 正在跟隨 ")])]),n("div",{staticClass:"content-render"},[e.showContent.follower?n("Follower"):e._e(),n("Following",{directives:[{name:"show",rawName:"v-show",value:e.showContent.following,expression:"showContent.following"}]})],1)])]),n("div",{staticClass:"main-follower col-4 h-100"},[n("Followers",{attrs:{"user-profile":e.user,"follower-list":e.followerlist}})],1)])])},o=[],a=(n("96cf"),n("1da1")),s=n("5530"),c=n("d178"),i=n("7168"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(e.followers,(function(t){return n("div",{key:t.followerId,staticClass:"card",on:{click:function(n){return e.userLink(t.followerId)}}},[n("div",{staticClass:"user-avatar"},[n("img",{staticClass:"avatar",attrs:{src:t.avatar,alt:""},on:{click:function(n){return e.userLink(t.followerId)}}})]),n("div",{staticClass:"content"},[n("div",{staticClass:"detail"},[n("div",{staticClass:"name mr-1"},[e._v(e._s(t.name))]),n("div",{staticClass:"account mr-1"},[e._v("@"+e._s(t.account))]),n("div",{staticClass:"tweet"},[e._v(" "+e._s(t.introduction)+" ")])])]),t.isFollowed?n("button",{staticClass:"follower-btn",on:{click:function(n){return n.stopPropagation(),n.preventDefault(),e.deleteFollowing(t.followerId)}}},[e._v(" 正在跟隨 ")]):n("button",{staticClass:"follow-btn",on:{click:function(n){return n.stopPropagation(),n.preventDefault(),e.addFollowing(t.followerId)}}},[e._v(" 追隨 ")])])})),0)},u=[],f=(n("d81d"),n("1602")),w=n("2fa3"),d=n("2f62"),h={data:function(){return{followers:[]}},computed:Object(s["a"])({},Object(d["b"])(["currentUser"])),created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f["a"].getFollower(e.currentUser.id);case 3:n=t.sent,r=n.data,e.followers=r,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log("error",t.t0),w["a"].fire({icon:"warning",title:t.t0});case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},deleteFollowing:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,f["a"].deleteFollowing(e);case 3:if(r=n.sent,o=r.data,"success"===o.status){n.next=7;break}throw new Error(o.message);case 7:t.followers=t.followers.map((function(t){return t.followerId!==e?t:Object(s["a"])(Object(s["a"])({},t),{},{isFollowed:0})})),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](0),w["a"].fire({icon:"error",title:"無法取消追蹤，請稍後再試"});case 13:case"end":return n.stop()}}),n,null,[[0,10]])})))()},addFollowing:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,f["a"].addFollowing(e);case 3:if(r=n.sent,o=r.data,console.log(e),"success"===o.status){n.next=8;break}throw new Error(o.message);case 8:t.followers=t.followers.map((function(t){return t.followerId!==e?t:Object(s["a"])(Object(s["a"])({},t),{},{isFollowed:1})})),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](0),w["a"].fire({icon:"error",title:"無法追蹤，請稍後再試"});case 14:case"end":return n.stop()}}),n,null,[[0,11]])})))()},userLink:function(e){console.log(e),this.$router.push({name:"profile",params:{id:e}})}}},v=h,p=(n("e420"),n("2877")),g=Object(p["a"])(v,l,u,!1,null,"1b565c3b",null),b=g.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(e.followers,(function(t){return n("div",{key:t.followingId,staticClass:"card",on:{click:function(n){return e.userLink(t.followingId)}}},[n("div",{staticClass:"user-avatar"},[n("img",{staticClass:"avatar",attrs:{src:t.avatar,alt:""},on:{click:function(n){return e.userLink(t.followingId)}}})]),n("div",{staticClass:"content"},[n("div",{staticClass:"detail"},[n("div",{staticClass:"name mr-1"},[e._v(e._s(t.name))]),n("div",{staticClass:"account mr-1"},[e._v("@"+e._s(t.account))]),n("div",{staticClass:"tweet"},[e._v(" "+e._s(t.introduction)+" ")])])]),t.isFollowed?n("button",{staticClass:"follower-btn",on:{click:function(n){return n.stopPropagation(),n.preventDefault(),e.deleteFollowing(t.followingId)}}},[e._v(" 正在跟隨 ")]):n("button",{staticClass:"follow-btn",on:{click:function(n){return n.stopPropagation(),n.preventDefault(),e.addFollowing(t.followingId)}}},[e._v(" 追隨 ")])])})),0)},k=[],C={data:function(){return{followers:[]}},computed:Object(s["a"])({},Object(d["b"])(["currentUser"])),created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f["a"].getFollowing(e.currentUser.id);case 3:n=t.sent,r=n.data,e.followers=r,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log("error",t.t0),w["a"].fire({icon:"warning",title:t.t0});case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},deleteFollowing:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,f["a"].deleteFollowing(e);case 3:if(r=n.sent,o=r.data,"success"===o.status){n.next=7;break}throw new Error(o.message);case 7:t.followers=t.followers.map((function(t){return t.followingId!==e?t:Object(s["a"])(Object(s["a"])({},t),{},{isFollowed:0})})),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](0),w["a"].fire({icon:"error",title:"無法取消追蹤，請稍後再試"});case 13:case"end":return n.stop()}}),n,null,[[0,10]])})))()},addFollowing:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,f["a"].addFollowing(e);case 3:if(r=n.sent,o=r.data,"success"===o.status){n.next=7;break}throw new Error(o.message);case 7:t.followers=t.followers.map((function(t){return t.followingId!==e?t:Object(s["a"])(Object(s["a"])({},t),{},{isFollowed:1})})),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](0),w["a"].fire({icon:"error",title:"無法追蹤，請稍後再試"});case 13:case"end":return n.stop()}}),n,null,[[0,10]])})))()},userLink:function(e){console.log(e),this.$router.push({name:"profile",params:{id:e}})}}},x=C,F=(n("8793"),Object(p["a"])(x,m,k,!1,null,"30cbf718",null)),_=F.exports,j=n("ebc9"),O=n("2708"),R={mixins:[O["a"]],components:{Navbar:c["a"],Followers:i["a"],Follower:b,Following:_},data:function(){return{isFollowed:!0,user:{},showContent:{follower:!0,following:!1},followerlist:[]}},computed:Object(s["a"])({},Object(d["b"])(["currentUser"])),created:function(){var e=this.$route.params.id;this.fetchUsers(e),this.fetchFollowerList()},methods:{fetchFollowerList:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j["a"].TopUsers();case 3:n=t.sent,e.followerlist=n.data,t.next=11;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log("error",t.t0),w["a"].fire({icon:"warning",title:t.t0});case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))()},fetchUsers:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,f["a"].getUser(e);case 3:r=n.sent,o=r.data,t.user=o,n.next=12;break;case 8:n.prev=8,n.t0=n["catch"](0),console.log("error",n.t0),w["a"].fire({icon:"warning",title:n.t0});case 12:case"end":return n.stop()}}),n,null,[[0,8]])})))()},showfollower:function(){this.showContent.follower=!0,this.showContent.following=!1},showfollowing:function(){this.showContent.follower=!1,this.showContent.following=!0}}},I=R,B=(n("5c2c"),Object(p["a"])(I,r,o,!1,null,"29fa8936",null));t["default"]=B.exports}}]);
//# sourceMappingURL=chunk-bd4aa99c.d9073333.js.map