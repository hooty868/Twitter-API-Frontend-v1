<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar />
      </div>
      <div class="main-content col h-100">
        <div class="header pl-3">
          <img @click="$router.back()" src="/image/arrow.png" alt="" />
          <div class="header-content">
            <p class="name">{{ user.name }}</p>
            <p class="twitter">{{ user.tweetCount }}推文</p>
          </div>
        </div>
        <div class="user-info">
          <div class="background">
            <img class="background" :src="user.cover" alt="" />
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
                <router-link
                  :to="{ name: 'follow-other', params: { id: user.id } }"
                  class="button-link follow-detail"
                >
                  <p>{{ user.followingCount }}個 <span>追隨中</span></p>
                </router-link>
                <router-link
                  :to="{ name: 'follow-other', params: { id: user.id } }"
                  class="button-link follow-detail"
                >
                  <p>{{ user.followerCount }}位 <span>追隨者</span></p>
                </router-link>
                <div class="edit-button" v-if="isCurrentUser">
                  <button
                    class="btn edit"
                    type="button"
                    data-toggle="modal"
                    data-target="#edit"
                  >
                    編輯個人資料
                  </button>
                </div>
                <div v-else class="edit row">
                  <div class="icon-wrapper">
                    <img src="/image/mail.png" alt="" />
                  </div>
                  <div class="icon-wrapper">
                    <img
                      v-if="user.isFollowed"
                      src="/image/bellChecked.png"
                      alt=""
                    />
                    <img v-else src="/image/bell.png" alt="" />
                  </div>

                  <div>
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
                <img
                  @click="userLink(tweet.user.id)"
                  class="user-avatar"
                  :src="tweet.user.avatar"
                  alt=""
                />
              </div>
              <div class="content">
                <div class="detail">
                  <div class="name mr-1">{{ tweet.user.name }}</div>
                  <div class="account mr-1">@{{ tweet.user.account }} ・</div>
                  <div class="creat-time">{{ tweet.createdAt | fromNow }}</div>
                </div>
                <div class="tweet" @click="twitterLink(tweet.id)">
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
          <div class="content-render like-part" v-if="showContent.like">
            <div class="card" v-for="like in likes" :key="like.id">
              <div class="user-avatar">
                <img
                  @click="userLink(like.user.id)"
                  class="user-avatar"
                  :src="like.user.avatar"
                  alt=""
                />
              </div>
              <div class="content">
                <div class="detail">
                  <div @click="userLink(like.user.id)" class="name mr-1">
                    {{ like.user.name }}
                  </div>
                  <div class="account mr-1">@{{ like.user.account }}・</div>
                  <div class="creat-time">{{ like.createdAt | fromNow }}</div>
                </div>
                <div class="tweet" @click="twitterLink(like.TweetId)">
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
                  @click="userLink(user.id)"
                  class="user-avatar"
                  :src="user.avatar"
                  alt=""
                />
              </div>
              <div class="content">
                <div class="detail">
                  <div class="name mr-1">{{ user.name }}</div>
                  <div class="account mr-1">@{{ user.account }}・</div>
                  <div class="creat-time">{{ reply.createdAt | fromNow }}</div>
                </div>
                <div class="reply-to">
                  <div class="reply">回覆</div>
                  <div
                    @click="userLink(reply.Tweet.User.id)"
                    class="reply-count"
                  >
                    @{{ reply.Tweet.User.account }}
                  </div>
                </div>
                <div class="tweet" @click="twitterLink(reply.TweetId)">
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
            </div>
          </div>
          <form @submit.stop.prevent="handleSubmit">
            <div class="background">
              <img
                class="background"
                :src="editUser.cover ? editUser.cover : user.cover"
                alt=""
              />
              <div class="edit-icon-group">
                <label for="cover">
                  <input
                    id="cover"
                    type="file"
                    name="cover"
                    accept="image/*"
                    class="form-control-file"
                    style="display: none"
                    @change="handleCoverChange"
                  />
                  <img class="edit-icon" src="/image/editImage.png" alt="" />
                </label>
                <img class="edit-icon" src="/image/exit.png" alt="" />
              </div>

              <div class="avatar">
                <img
                  class="modal-avatar-img"
                  :src="editUser.avatar ? editUser.avatar : user.avatar"
                  alt=""
                />
                <div class="edit-icon">
                  <label for="avatar">
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      class="form-control-file"
                      style="display: none"
                      @change="handleAvatarChange"
                    />
                    <img class="edit-icon" src="/image/editImage.png" alt="" />
                  </label>
                </div>
              </div>
            </div>
            <div class="text-input">
              <div class="form-label-group mb-2 input-name">
                <input
                  v-model="user.name"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="名稱"
                  autocomplete="username"
                  required
                  autofocus
                />
              </div>

              <div class="form-label-group mb-3 input-intro">
                <textarea
                  v-model="user.introduction"
                  name="introduction"
                  id="introduction"
                  cols="30"
                  rows="10"
                  required
                >
                </textarea>
              </div>
            </div>
            <button type="submit" class="save btn btn-primary">儲存</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import Followers from "./../components/followers";
import followerAPI from "./../apis/followers";
import userAPI from "../apis/user";
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [fromNowFilter],
  components: {
    Navbar,
    Followers,
  },
  data() {
    return {
      editUser: {
        cover: "",
        avatar: "",
      },
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
      isCurrentUser: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.userCheck(userId);
    this.fetchUsers(userId);
    this.fetchTweets(userId);
    this.fetchLikes(userId);
    this.fetchReply(userId);
    this.fetchFollowerList();
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
    handleCoverChange(e) {
      const { files } = e.target;

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.editUser.cover = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.editUser.cover = imageURL;
      }
    },
    handleAvatarChange(e) {
      const { files } = e.target;

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.editUser.avatar = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.editUser.avatar = imageURL;
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
    userLink(userId) {
      this.$router.push({ name: "profile", params: { id: userId } });
    },
    twitterLink(twitterId) {
      this.$router.push({ name: "twitterDetail", params: { id: twitterId } });
    },
    userCheck(userId) {
      if (Number(userId) === this.currentUser.id) {
        return (this.isCurrentUser = true);
      } else {
        this.isCurrentUser = false;
      }
    },
    async handleSubmit(e) {
      try {
        const form = e.target;
        const formData = new FormData(form);
        console.log(formData);

        const { data } = await userAPI.update({
          userId: this.currentUser.id,
          formData,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        location.reload();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法更新資料，請稍後再試",
        });
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.userCheck(userId);
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

.user-info .background {
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
  color: black;
}

.follow-detail span {
  color: #657786;
}

.detail .edit-button .edit {
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

.detail .edit .follow-btn {
  width: 122px;
  height: 40px;
  border: 1px solid #ff6600;
  background: white;
  color: #ff6600;
  border-radius: 100px;
  font-weight: bold;
  outline: none;
}

.detail .edit .follower-btn {
  width: 122px;
  height: 40px;
  border: 1px solid #ff6600;
  background: #ff6600;
  color: #fff;
  border-radius: 100px;
  font-weight: bold;
  outline: none;
}

.detail .edit {
  position: absolute;
  right: 30px;
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

.card .content {
  width: 100%;
}

.card .user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #c4c4c4;
  margin-right: 10px;
}

.card .detail,
.card .reply-to {
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
.follow-content .like,
.card .reply-to .reply {
  color: #657786;
}
.like-part .follow-content .like {
  color: #e0245e;
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

.header-wrapper .close {
  color: #ff6600;
  font-size: 30px;
  margin-right: 44px;
}

.modal-content .background {
  position: relative;
  width: 100%;
  height: 200px;
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

.modal-content .avatar .modal-avatar-img {
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

.modal-content input,
.modal-content textarea {
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

.edit-icon {
  width: 20px;
  height: 20px;
}

.avatar .edit-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.background .edit-icon-group {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.background .edit-icon-group .edit-icon {
  margin-right: 36px;
}

.modal-content form .save {
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
  position: absolute;
  right: 15px;
  top: 12px;
}
</style>