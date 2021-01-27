# Twitter-front-end-vue
利用前端技術框架Vue整合後端，並使用 Node.js + Express框架，並搭配MySQLdb作為後端資料庫，
並利用expressRouter，建立具有RESTful風格的後端API，打造Twitter社交網站，再加上搜尋/排序Twitter動態訊息等功能。

## 畫面截圖
![首頁](https://media.giphy.com/media/WHoRTHcpxYnyXrblcW/giphy.gif)

## Features - 產品功能

- 使用者可以新增一則Twitter個人動態
- 使用者可以瀏覽個人全部Twitter動態
- 使用者可以回覆一則Twitter個人動態
- 使用者可以刪除Twitter個人動態
- 使用者可以排序Twitter個人動態
- 使用者可以利用有限的帳密組去做登入的動作
- 如果使用者登入輸入錯誤，會再登入頁面顯示錯誤

## Environment SetUp - 環境建置

**Front End**

- [[Visual Studio Code]](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [[Node.js]](https://nodejs.org/en/) - 後端語言
- [[npm]](https://www.npmjs.com/) - 套件管理
- [[Vue.js]](https://github.com/vuejs/vue) - 前端框架
- [Vuex](https://github.com/vuejs/vuex) - Vue.js的狀態管理套件
- [Vue-router](https://github.com/vuejs/vuex) - Vue.js的導航管理套件
- [sweetalert2](https://github.com/sweetalert2/sweetalert2) - 優化彈跳視窗畫面
- [Sass](https://github.com/sass/node-sass) - css預處理器,簡化css設計
- [Bootstrap](https://github.com/twbs/bootstrap) - CSS框架,快速打造RWD網頁
- [moment.js](https://github.com/moment/moment/) - 解析與驗證,並顯示與使用者一致的日期和時間
- [socket.io-client](https://github.com/FortAwesome/Font-Awesome) - 與後端建立socket連結，在公開聊天室與多人互動

## 前端專案設置
```
npm install
```
### 編譯和即時重編譯以進行開發
```
npm run serve
```
### 編譯並最打包成靜態網頁專案
```
npm run build
```
### 整理和修復專案程式碼
```
npm run lint
```

## 使用者如何使用

### 使用者

身為使用者，你可以這麼做: 
1. 註冊使用者帳密，並且登入平台
2. 觀看全站貼文，也可以在首頁推文
3. 在首頁右側，去追蹤前十大排名的追蹤者
4. 在首頁左側有導航欄，去重新設定你的個人帳密資訊以及信箱
5. 導航欄也可以到個人資料頁面去更改你的頭貼與封面照片，並且也可以看見自己按讚與推過的文
6. 也可以觀看別人的個人資料頁面，看他推過的文以及按過讚的推文
7. 並且可以在公開聊天室與大家互動

### 管理者

身為管理者，你可以這麼做: 
1.可以看見全站推文清單，並允許做刪除動作
2.可以看見全使用者清單，使用者的全部資訊，大頭貼/封面照片/按讚與推文次數/追蹤與被追蹤次數

## API設計

經過討論過後與後端API串接清單：

### 管理員
```
- (管理員的使用者清單)GET :  /api/admin/users 

- (刪除推文)DELET : /api/admin/tweets/:tweetId]

- (取得全站的推文)GET : /api/admin/tweets
```

### 使用者

#### 追蹤其他使用者
```
- (追蹤) POST : api/followships
- (取消追蹤) DELETE : api/followships/:followingId
- (取得使用者追蹤的人清單) GET : /api/users/:id/followings
- (取得使用者的跟隨者的清單) GET : /api/users/:id/followers
- (取得top10使用者清單) GET : /api/users/top
```
#### 按讚其他使用者
```
- (推文按讚) POST : /api/tweets/:tweetId/like
- (取消推文按讚) POST : /api/tweets/:tweetId/unlike
```
#### 推文
```
- (新增推文) POST /api/tweets
- (取得全站的推文) GET /api/tweets
- (取得某一則推文) GET /api/tweets/:tweetId
- (取得使用者發的所有推文) GET /api/users/:id/tweets
- (取得使用者like過的所有推文) GET /api/users/:id/like
- (取得使用者所有回覆過的推文) GET /api/users/:id/replied_tweets
- (更新推文) PUT /api/tweets/:tweetId]
- (刪除推文) DELETE /api/tweets/:tweetId
```
#### 推文
```
- (新增推文) POST /api/tweets
- (取得全站的推文) GET /api/tweets
- (取得某一則推文) GET /api/tweets/:tweetId
- (取得使用者發的所有推文) GET /api/users/:id/tweets
- (取得使用者like過的所有推文) GET /api/users/:id/like
- (取得使用者所有回覆過的推文) GET /api/users/:id/replied_tweets
- (更新推文) PUT /api/tweets/:tweetId]
- (刪除推文) DELETE /api/tweets/:tweetId
```
#### 留言
```
- (新增推文留言) POST /api/tweets/:tweetId/replies
- (取得某一則推文的所有留言) GET /api/tweets/:tweetId/replies
- (取得某一則留言) GET /api/replies/:replyId
- (更新留言) PUT /api/replies/:replyId
- (刪除留言) DELETE /api/replies/:replyId
```
#### 使用者資料
```
- (取得使用者資料) GET /api/users/:id
- (編輯個人資料) PUT /api/users/:id
- (設定使用者資料) PUT /api/users/:id/setting
- (取得登入的使用者資料) GET /api/get_current_user
```

## 未來功能
- 加入私人聊天室功能
- 加入訊息通知功能
- 加入插入廣告頁面



