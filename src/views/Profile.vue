<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar />
      </div>
      <div class="main-content col h-100">
        <div class="header pl-3">
          <img src="/image/arrow.png" alt="" />
          <div class="header-content">
            <p class="name">{{ user.name }}</p>
            <p class="twitter">25推文</p>
          </div>
        </div>
        <div class="user-info">
          <div class="background">
            <img :src="user.cover" alt="" />
            <div class="avatar">
              <img :src="user.avatar" alt="" />
            </div>
          </div>
          <div class="user">
            <div class="detail">
              <p class="name">{{ user.name }}</p>
              <p class="account">@{{ user.account }}</p>
              <p class="intro">
                {{ user.introduction }}
              </p>
              <div class="follow-detail">
                <p>{{ user.followingCount }}個 <span>追隨中</span></p>
                <p>{{ user.followerCount }}位 <span>追隨者</span></p>
                <div />
                <button
                  class="btn edit"
                  type="button"
                  data-toggle="modal"
                  data-target="#edit"
                >
                  編輯個人資料
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="user-tweet">
          <div class="content-control d-flex">
            <div
              class="tweets content"
              v-bind:class="{ active: showContent.tweets }"
              v-on:click="showTweets()"
            >
              推文
            </div>
            <div
              class="response content"
              v-bind:class="{ active: showContent.reply }"
              v-on:click="showReply()"
            >
              推文與回覆
            </div>
            <div
              class="liked content"
              v-bind:class="{ active: showContent.like }"
              v-on:click="showLike()"
            >
              喜歡的內容
            </div>
          </div>
          <div class="content-render" v-if="showContent.tweets">
            <div class="card" v-for="tweet in tweets" :key="tweet.id">
              <div class="user-avatar">
                <img class="user-avatar" :src="tweet.user.avatar" alt="" />
              </div>
              <div class="content">
                <div class="detail">
                  <div class="name mr-1">{{ tweet.user.name }}</div>
                  <div class="account mr-1">@{{ tweet.user.account }} ・</div>
                  <div class="creat-time">{{ tweet.createdAt | fromNow }}</div>
                </div>
                <div class="tweet">
                  {{ tweet.description }}
                </div>
                <div class="follow-content">
                  <div class="response">
                    <img src="/image/reply_icon.png" alt="" />
                    {{ tweet.repliedCount }}
                  </div>
                  <div class="like">
                    <img src="/image/like_icon.png" alt="" />
                    {{ tweet.likedCount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-render" v-if="showContent.like">
            <div class="card" v-for="like in likes" :key="like.id">
              <div class="user-avatar">
                <img class="user-avatar" :src="like.user.avatar" alt="" />
              </div>
              <div class="content">
                <div class="detail">
                  <div class="name mr-1">{{ like.user.name }}</div>
                  <div class="account mr-1">@{{ like.user.account }}・</div>
                  <div class="creat-time">{{ like.createdAt | fromNow }}</div>
                </div>
                <div class="tweet">
                  {{ like.description }}
                </div>
                <div class="follow-content">
                  <div class="response">
                    <img src="/image/reply_icon.png" alt="" />{{
                      like.repliedCount
                    }}
                  </div>
                  <div class="like">
                    <img src="/image/liked.png" alt="" />{{ like.likedCount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-follower col-4 h-100">
        <Followers />
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="edit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="header-wrapper">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                x
              </button>
              <div>
                <p class="modal-title" id="exampleModalLabel">編輯個人資料</p>
              </div>
              <button type="button" class="save btn btn-primary">儲存</button>
            </div>
          </div>
          <div class="background">
            <img :src="user.cover" alt="" />
            <div class="avatar">
              <img :src="user.avatar" alt="" />
            </div>
          </div>
          <div class="text-input">
            <div class="form-label-group mb-2 input-name">
              <input
                v-model="account"
                id="name"
                name="name"
                type="name"
                placeholder="名稱"
                autocomplete="username"
                required
                autofocus
              />
            </div>

            <div class="form-label-group mb-3 input-intro">
              <input
                v-model="password"
                id="introduction"
                name="introduction"
                type="introduction"
                placeholder="自我介紹"
                autocomplete="current-password"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import Followers from "./../components/followers";
// import { mapState } from "vuex";
import userAPI from "../apis/user";
import { fromNowFilter } from "./../utils/mixins";

export default {
  mixins: [fromNowFilter],
  components: {
    Navbar,
    Followers,
  },
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        email: "",
        role: "",
      },
      user: "",
      tweets: "",
      likes: "",
      showContent: {
        tweets: true,
        reply: false,
        like: false,
      },
    };
  },
  created() {
    this.fetchUsers();
    this.fetchTweets();
    this.fetchLikes();
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await userAPI.getUser(11);
        this.user = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTweets() {
      try {
        const { data } = await userAPI.getTweets(11);
        this.tweets = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLikes() {
      try {
        const { data } = await userAPI.getLikes(11);
        console.log(data);
        this.likes = data;
      } catch (error) {
        console.log(error);
      }
    },

    showTweets() {
      this.showContent.tweets = true;
      this.showContent.reply = false;
      this.showContent.like = false;
    },
    showReply() {
      this.showContent.tweets = false;
      this.showContent.reply = true;
      this.showContent.like = false;
    },
    showLike() {
      this.showContent.tweets = false;
      this.showContent.reply = false;
      this.showContent.like = true;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1440px;
  height: 1200px;
  margin: 0 auto 0 auto;
}
.navbar {
  margin: 0 25px auto auto;
}
.main-content {
  width: 600px;
  padding: 0;
  border: 1px #e6ecf0 solid;
}
.main-content .header {
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
}

.main-content .header img:hover {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.header-content {
  margin-left: 2rem;
}
.header-content .name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: -0.3rem;
}
.header-content .twitter {
  font-size: 0.5rem;
  margin-bottom: -0.3rem;
  color: #657786;
}

.user-info {
  width: 100%;
}

.user-info .background,
.background img {
  width: 100%;
  height: 200px;
}

.user-info .background {
  position: relative;
}

.user-info .avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -70px;
  left: 14px;
}

.user-info .avatar img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
}

.user {
  padding-top: 70px;
  padding-left: 15px;
  position: relative;
}

.user .name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: -0.3rem;
}

.user .account {
  color: #657786;
}

.detail .follow-detail {
  display: flex;
}
.follow-detail p {
  font-weight: bold;
  margin-right: 20px;
}

.follow-detail span {
  color: #657786;
}

.detail button {
  width: 122px;
  height: 40px;
  border: 1px solid #ff6600;
  color: #ff6600;
  font-weight: bold;
  border-radius: 100px;
  position: absolute;
  right: 15px;
  top: 10px;
}

.user-tweet {
  width: 100%;
  height: 50px;
  margin-top: 30px;
}
.content-control {
  height: 50px;
}

.content-control .content {
  width: 130px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  color: #657786;
  font-size: 16px;
  cursor: pointer;
}

.content-control .active {
  color: #ff6600;
  border-bottom: 2px solid #ff6600;
}

.card {
  border: 1px solid #e6ecf0;
  width: 100%;
  min-height: 144px;
  display: flex;
  flex-direction: row;
  padding: 15px 0 0 13px;
}

.card .user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #c4c4c4;
  margin-right: 10px;
}

.card .detail {
  display: flex;
}

.card .detail .name {
  font-weight: bold;
}

.card .tweet {
  margin: 6px 15px 14px 0;
}

.card .detail .account,
.creat-time,
.follow-content .response,
.follow-content .like {
  color: #657786;
}

.follow-content {
  display: flex;
  margin-bottom: 14px;
}
.content .follow-content img {
  width: 14px;
  height: 14px;
  margin-right: 11px;
}

.content .follow-content .response {
  margin-right: 50px;
}

/* modal content */

.modal-content {
  width: 600px;
  height: 654px;
}

.header-wrapper {
  display: flex;
  align-items: center;
}

.header-wrapper .modal-title {
  font-weight: bold;
  font-size: 19px;
  margin-right: 342px;
  width: 100%;
}

.header-wrapper .save {
  background: #ff6600;
  border-radius: 100px;
  color: #ffffff;
  border: none;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 30px;
}

.header-wrapper .close {
  color: #ff6600;
  font-size: 30px;
  margin-right: 44px;
}

.modal-content .background {
  position: relative;
}

.modal-content .avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -70px;
  left: 14px;
}

.modal-content .avatar img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
}

.modal-content .text-input {
  margin-top: 80px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-content input {
  background: #f5f8fa;
  display: block;
  border: none;
  border-bottom: 2px solid #657786;
  width: 570px;
}

.modal-content #name {
  height: 54px;
}

.modal-content #introduction {
  height: 150px;
}

.modal-content input::placeholder {
  position: relative;
  top: -25%;
  left: 1%;
  font-size: 0.9rem;
  color: #657786;
}
</style>