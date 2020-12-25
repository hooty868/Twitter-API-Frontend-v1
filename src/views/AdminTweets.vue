<template>
  <div id="main-app">
    <nav class="d-flex flex-column justify-content-between align-items-center">
      <div class="top-items">
        <div class="logo-container">
          <img
            class="logo"
            src="https://upload.cc/i1/2020/12/24/MLqwE5.png"
            alt="Logo"
          />
        </div>
        <div class="pannel-icon-container chosen d-flex">
          <img
            class="pannel-icon"
            src="https://upload.cc/i1/2020/12/24/HZJjDN.png"
            alt="Index"
          />
          <h1 class="pannel-icon-text chosen">推文清單</h1>
        </div>

        <router-link to="/admin/users">
          <div class="pannel-icon-container d-flex">
            <img
              class="pannel-icon"
              src="https://upload.cc/i1/2020/12/24/T9gfR2.png"
              alt="Profile"
            />
            <h1 class="pannel-icon-text">使用者列表</h1>
          </div>
        </router-link>
      </div>
      <div>
        <div class="d-flex align-items-center" @click="logout">
          <img
            class="pannel-icon m-3"
            src="https://upload.cc/i1/2020/12/24/6SJqIC.png"
            alt="Index"
          />
          <a href="#" class="text-center text-dark">登出</a>
        </div>
      </div>
    </nav>
    <main id="main-content">
      <div class="title">
        <h4>推文清單</h4>
      </div>
      <div class="card-wrapper">
        <div class="card" v-for="tweet in tweets" :key="tweet.id">
          <div class="user-avatar">
            <img class="user-avatar" :src="tweet.User.avatar" alt="" />
          </div>
          <div class="content">
            <div class="detail">
              <div class="name mr-1">{{ tweet.User.name }}</div>
              <div class="account mr-1">{{ tweet.User.account }}</div>
              <div class="creat-time">{{ tweet.createdAt }}</div>
            </div>
            <div class="tweet">
              {{ tweet.description | printString }}
            </div>
          </div>

          <div
            class="tweet-delete"
            @click.stop.prevent="deleteTweets(tweet.id)"
          >
            x
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      tweets: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const { data } = await adminAPI.tweets.get();
        this.tweets = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
      }
    },
    async deleteTweets(tweetId) {
      try {
        const { data } = await adminAPI.tweets.delete({ tweetId });
        console.log(tweetId);

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將推文移除，請稍後再試",
        });
        console.log("error", error);
      }
    },
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/admin/signin");
    },
  },
  filters: {
    //印出前五十個字
    printString(string) {
      return string.slice(0, 49);
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
  color: black;
}
.pannel-icon-container .chosen {
  color: #ff6600;
}

/* right side */

#main-app {
  height: 100%;
}

#main-content {
  margin-left: 380px;
}

.title {
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

.card {
  border: 1px solid #e6ecf0;
  width: 100%;
  height: 124px;
  display: flex;
  flex-direction: row;
  position: relative;
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 1rem;
}

.content {
  margin-left: 2rem;
}

.detail {
  display: flex;
}
.detail .name {
  font-weight: bold;
  font-size: 16px;
}

.tweet {
  width: 100%;
}

.tweet-delete {
  position: absolute;
  color: #657786;
  font-size: 2rem;
  right: 1rem;
  top: 0.5rem;
  cursor: pointer;
}
.tweet-delete:hover {
  color: black;
}
</style>
