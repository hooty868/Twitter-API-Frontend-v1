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

                <div class="edit row">
                  <div class="icon-wrapper">
                    <img src="/image/mail.png" alt="" />
                  </div>
                  <div class="icon-wrapper">
                    <img src="/image/bell.png" alt="" />
                  </div>
                  <button
                    v-if="user.isFollowed"
                    class="follower-btn"
                    @click.stop.prevent="deleteFollowing(user.id)"
                  >
                    正在跟隨
                  </button>
                  <button
                    v-else
                    class="follow-btn"
                    @click.stop.prevent="addFollowing(user.id)"
                  >
                    追隨
                  </button>
                </div>
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
          <div class="content-render" v-if="showContent.reply">
            <div class="card" v-for="reply in replies" :key="reply.id">
              <div class="user-avatar">
                <img
                  class="user-avatar"
                  :src="reply.Tweet.User.avatar"
                  alt=""
                />
              </div>
              <div class="content">
                <div class="detail">
                  <div class="name mr-1">{{ reply.Tweet.User.name }}</div>
                  <div class="account mr-1">
                    @{{ reply.Tweet.User.account }}・
                  </div>
                  <div class="creat-time">{{ reply.createdAt | fromNow }}</div>
                </div>
                <div class="tweet">
                  {{ reply.comment }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-follower col-4 h-100">
        <Followers :user-profile="user" :follower-list="followerlist" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import Followers from "./../components/followers";
import userAPI from "../apis/user";
import followerAPI from "./../apis/followers";
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [fromNowFilter],
  components: {
    Navbar,
    Followers,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      user: {},
      tweets: "",
      likes: "",
      replies: "",
      showContent: {
        tweets: true,
        reply: false,
        like: false,
      },
      followerlist: [],
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUsers(userId);
    this.fetchTweets(userId);
    this.fetchLikes(userId);
    this.fetchReply(userId);
  },
  methods: {
    async fetchFollowerList() {
      try {
        const response = await followerAPI.TopUsers();
        this.followerlist = response.data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
    async fetchUsers(userId) {
      try {
        console.log(userId);
        const { data } = await userAPI.getUser(userId);
        this.user = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTweets(userId) {
      try {
        const { data } = await userAPI.getTweets(userId);
        this.tweets = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLikes(userId) {
      try {
        const { data } = await userAPI.getLikes(userId);
        console.log(data);
        this.likes = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchReply(userId) {
      try {
        const { data } = await userAPI.getReply(userId);
        this.replies = data;
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
    async deleteFollowing(userId) {
      try {
        const { data } = await userAPI.deleteFollowing(userId);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.user.isFollowed = 0;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await userAPI.addFollowing(userId);

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.user.isFollowed = 1;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試",
        });
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUsers(userId);
    this.fetchTweets(userId);
    this.fetchLikes(userId);
    next();
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

.detail .edit {
  position: absolute;
  right: 30px;
  top: 10px;
}

.detail .follower-btn {
  width: 122px;
  height: 40px;
  border: 1px solid #ff6600;
  background: #ff6600;
  color: #fff;
  border-radius: 100px;
  font-weight: bold;
  outline: none;
}

.detail .follow-btn {
  width: 122px;
  height: 40px;
  border: 1px solid #ff6600;
  background: white;
  color: #ff6600;
  border-radius: 100px;
  font-weight: bold;
  outline: none;
}

.detail .edit .icon-wrapper {
  width: 40px;
  height: 40px;
  border: 1px solid #ff6600;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
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
.content-render {
  max-height: 600px;
  overflow-y: scroll;
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
</style>