<template>
  <div id="main-app">
    <nav class="d-flex flex-column justify-content-between align-items-center">
      <div class="top-items">
        <div class="logo-container">
          <img class="logo" src="/image/Logo.png" alt="Logo" />
        </div>
        <div class="pannel-icon-container chosen d-flex">
          <img class="pannel-icon" src="/image/icon_index.png" alt="Index" />
          <h1 class="pannel-icon-text">推文清單</h1>
        </div>
        <div class="pannel-icon-container d-flex">
          <img
            class="pannel-icon"
            src="/image/icon_profile_orange.png"
            alt="Profile"
          />
          <h1 class="pannel-icon-text chosen">使用者列表</h1>
        </div>
      </div>
      <div>
        <div class="d-flex align-items-center">
          <img class="pannel-icon m-3" src="/image/logout@2x.png" alt="Index" />
          <a href="#" class="text-center text-dark">登出</a>
        </div>
      </div>
    </nav>
    <main id="main-content">
      <div class="title">
        <h4>使用者列表</h4>
      </div>
      <div class="card-list-panel d-flex justify-content-start">
        <div class="user-list">
          <div class="card" v-for="user in users" :key="user.id">
            <div class="user-cover">
              <img :src="user.cover" class="user-cover" />
            </div>
            <div class="avatar">
              <img class="user-avatar" :src="user.avatar" alt="" />
            </div>
            <div class="user-info">
              <p class="name">{{ user.name }}</p>
              <p class="account">{{ user.account }}</p>
              <div class="user-detail">
                <div class="d-flex align-items-center mr-2">
                  <img class="profile_icon" src="/image/like_icon.png" alt="" />
                  <p>{{ user.LikedCount }}</p>
                </div>
                <div class="d-flex align-items-center mr-2">
                  <img
                    class="profile_icon"
                    src="/image/reply_icon.png"
                    alt=""
                  />
                  <p>{{ user.tweetCount }}</p>
                </div>
              </div>
              <div class="user-detail">
                <p>{{ user.followingCount }}個 <span>跟隨中</span></p>
                <p>{{ user.followerCount }}位 <span>跟隨者</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        // STEP 3: 向伺服器取得餐廳類別清單
        const { data } = await adminAPI.users.get();
        this.users = data;
      } catch (error) {
        // STEP 4: 在 catch 中進行錯誤處理
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
/* left side */
nav {
  width: 380px;
  position: fixed;
  top: 0;
  bottom: 0;
  padding: 16px 0;
  z-index: 100;
  border: 1px solid #e6ecf0;
  background: #ffffff;
}

.pannel-container {
  width: 100%;
}
.logo-container {
  margin-top: 14px;
}
.logo {
  height: 30px;
  width: 30px;
}
.pannel-icon-container {
  width: 100%;
  height: 60px;
}

.pannel-icon {
  width: 22.2px;
  height: 20.25px;
  margin: auto 0 auto 0;
}
.pannel-icon-text {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 60px;
  margin: auto 0 auto 20px;
  cursor: pointer;
}
.pannel-icon-container .chosen {
  color: #ff6600;
}

/* right side */

#main-content {
  margin-left: 380px;
}

.title {
  position: fixed;
  top: 0%;
  border: 1px solid #e6ecf0;
  height: 55px;
  width: 100%;
  padding-left: 2rem;
}
.title h4 {
  line-height: 55px;
  color: black;
  font-weight: bold;
}

.card-list-panel {
  background-color: white;
}

.user-list {
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  padding-left: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
}

.card {
  max-width: 245px;
  min-width: 245px;
  height: 314px;
  text-align: center;
  border-radius: 10px 10px 10px 10px;
  background: #f6f7f8;
  position: relative;
  border: none;
  margin-bottom: 1rem;
}

.user-cover {
  width: 245px;
  border-radius: 10px 10px 0px 0px;
  height: 140px;
  background: #c4c4c4;
}

.avatar {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  position: absolute;
  z-index: 20;
  top: 23%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar .user-avatar {
  width: 93px;
  height: 93px;
  border-radius: 50%;
}

.user-info {
  margin-top: 2.5rem;
}

.user-detail {
  display: flex;
  justify-content: center;
}

.user-info p {
  margin: 0.15rem;
  font-size: 16px;
}
.user-info .name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: -0.3rem;
}

.profile_icon {
  width: 19px;
  height: 19px;
}

.account,
span {
  color: #657786;
}
</style>
