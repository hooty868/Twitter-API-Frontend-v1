<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar
          @after-create-twitter="afterCreateTwitter"
          :user-profile="UserProfile"
        />
      </div>
      <div class="main-content col h-100">
        <div class="header d-flex">
          <img
            class="back-icon"
            src="/image/back_icon.png"
            alt="backIcon"
            @click="$router.go(-1)"
          />
          <p>推文</p>
        </div>
        <div class="twitter-bar d-flex flex-column w-100">
          <div class="twitter-bar-container">
            <div class="profile-detail-bar d-flex">
              <img
                class="profile-avater"
                :src="UserProfile.User.avatar"
                alt="avater"
              />
              <div class="card-content">
                <p class="card-name">
                  {{ UserProfile.User.name }}
                </p>
                <p class="card-account">@{{ UserProfile.User.account }}</p>
              </div>
            </div>
            <div class="content-description flex-gr1 w-100">
              <p class="content-text">
                {{ UserProfile.description }}
              </p>
            </div>
            <div class="reply-time flex-gr1 d-flex w-100">
              <p class="content-text">上午 10:05・</p>
              <p class="content-text">2020年6月10日</p>
            </div>
            <div class="function-bar flex-gr1 d-flex w-100">
              <p class="content-text num-bd">
                {{ UserProfile.repliedCount }}
              </p>
              <p class="content-text text-bd mr-5 mr-20">回覆</p>
              <p class="content-text num-bd">{{ UserProfile.likedCount }}</p>
              <p class="content-text text-bd mr-5">喜歡次數</p>
            </div>
            <div class="icon-bar flex-gr1" :disabled="isProcessing">
              <img
                class="icon-img"
                src="/image/reply_icon.png"
                alt="icon"
                data-toggle="modal"
                data-target="#replyModal"
              />
              <img
                class="icon-img"
                src="/image/icon_like_fill.png"
                alt="icon"
                v-if="parseInt(UserProfile.isLiked, 10)"
                @click="Unliketwitter(UserProfile.id)"
                :disabled="isProcessing"
              />
              <img
                class="icon-img"
                src="/image/like_icon.png"
                alt="icon"
                @click="Liketwitter(UserProfile.id)"
                v-else
              />
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div
          class="modal fade"
          id="replyModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="header w-100">
                <img
                  class="cancle-icon"
                  src="/image/cancle_icon.png"
                  alt="cancle"
                  data-dismiss="modal"
                />
              </div>
              <div class="twitter-bar d-flex flex-column">
                <div class="content-bar d-flex">
                  <img
                    class="profile-avater"
                    :src="UserProfile.User.avatar"
                    alt="avater"
                  />
                  <div class="content-description">
                    <div class="description-head">
                      <p class="head-name">{{ UserProfile.User.name }}</p>
                      <p class="head-account-time">
                        @{{ UserProfile.User.account }} · 3小時
                      </p>
                    </div>
                    <div class="description-content">
                      <p>
                        {{ UserProfile.description }}
                      </p>
                    </div>
                    <div class="description-footer">
                      <p class="reply-for">回覆給</p>
                      <p class="reply-account">
                        ＠{{ UserProfile.User.account }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="reply-bar">
                  <img
                    class="reply-avater"
                    :src="currentuser.avatar"
                    alt="avater"
                  />
                  <form
                    class="form-group"
                    @submit.stop.prevent="replytwitter(UserProfile.id)"
                  >
                    <input
                      id="twitter"
                      v-model="twitter"
                      name="twitter"
                      type="twitter"
                      class="twitter-input"
                      autocomplete="twitter"
                      placeholder="推你的回覆"
                      required
                    />
                    <button
                      class="btn btn-lg btn-submit btn-block mb-3"
                      type="submit"
                      block
                    >
                      回覆
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <replyList :user-profile="UserProfile" :Twitters="twitters" />
      </div>
      <div class="main-follower col-4 h-100">
        <Followers :user-profile="UserProfile" :follower-list="followerlist" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import Followers from "./../components/followers";
import replyList from "./../components/replyList";
import twitterAPI from "./../apis/twitter";
import followerAPI from "./../apis/followers";
import userAPI from "./../apis/users";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    Navbar,
    Followers,
    replyList,
  },
  created() {
    const { id } = this.$route.params;
    this.fetchreplyList(id);
    this.fetchFollowerList();
    this.fetchTwitterDetail(id);
    this.fetchUser();
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    async fetchUser() {
      try {
        const Newdata = await userAPI.getCurrentUser();
        const userId = Newdata.data.id;
        const response = await userAPI.UserProfile(userId);
        this.currentuser = response.data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
    async Liketwitter(twitterId) {
      this.isProcessing = true;
      try {
        const response = await twitterAPI.likeTwitter(twitterId);
        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const NewlikeCount = this.UserProfile.likedCount + 1;
        this.UserProfile = {
          ...this.UserProfile,
          isLiked: 1,
          likedCount: NewlikeCount,
        };
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
      this.isProcessing = false;
    },
    async Unliketwitter(twitterId) {
      this.isProcessing = true;
      try {
        const response = await twitterAPI.unlikeTwitter(twitterId);
        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const NewlikeCount = this.UserProfile.likedCount - 1;
        this.UserProfile = {
          ...this.UserProfile,
          isLiked: 0,
          likedCount: NewlikeCount,
        };
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
      this.isProcessing = false;
    },
    async fetchTwitterDetail(id) {
      try {
        const response = await twitterAPI.getTwitterDetail(id);
        this.UserProfile = response.data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
    async fetchreplyList(id) {
      try {
        const response = await twitterAPI.getReplyList(id);
        this.twitters = response.data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
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
    async afterCreateTwitter(payload) {
      try {
        const { Description } = payload;
        this.twitter = Description;
        if (this.twitter.length > 140) {
          throw new Error("字數不可以超過140個字");
        } else if (this.twitter.length === 0) {
          throw new Error("不可以輸入空白");
        }
        const response = await twitterAPI.postTwitter({
          description: this.twitter,
        });
        const { data } = response;

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.repliedTwitter = {
          id: Math.floor(Math.random() * 100000000) + 1,
          User: {
            id: this.UserProfile.id,
            account: this.UserProfile.account,
            name: this.UserProfile.name,
            avatar: this.UserProfile.avatar,
          },
          repliedCount: 0,
          followedCount: 0,
          createdAt: new Date(),
          updatedAt: "",
          isliked: false,
          description: this.twitter,
        };
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
      this.twitter = "";
    },
    async replytwitter(twitterId) {
      try {
        if (this.twitter.trim().length > 140) {
          throw new Error("字數不可以超過140個字");
        } else if (this.twitter.length === 0) {
          throw new Error("不可以輸入空白");
        }
        const response = await twitterAPI.replyTwitter(twitterId, {
          comment: this.twitter,
        });
        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        location.reload();
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
      this.twitter = "";
    },
  },
  data() {
    return {
      isProcessing: false,
      twitter: "",
      UserId: "",
      currentuser: {},
      UserProfile: {
        User: {
          account: "test",
          avatar: "https://loremflickr.com/320/240/corgi?lock=14",
          cover: "test",
          createdAt: "test",
          email: "test@example.com",
          id: -1,
          introduction: "ttest",
          name: "test",
          password: "test",
          role: "test",
          updatedAt: "test",
        },
        UserId: -1,
        createdAt: "",
        description: "",
        id: -1,
        isLiked: -1,
        likedCount: -1,
        repliedCount: -1,
        updatedAt: "",
      },
      repliedTwitter: {
        id: -1,
        User: {
          id: 14,
          account: "bmw",
          name: "BMW",
          email: "BMW@example.com",
          avatar: "https://i.pravatar.cc/300",
          cover: "https://i.pravatar.cc/300",
          isFollowed: true,
          introduction: "hello world!",
          followerCount: 1,
          followingCount: 3,
        },
        repliedCount: -1,
        followedCount: -1,
        createdAt: "",
        updatedAt: "",
        isliked: true,
        description: "",
      },
      twitters: [],
      followerlist: [],
    };
  },
};
</script>

<style scoped>
.flex-gr1 {
  flex-grow: 1;
}
.mr-5 {
  margin-left: 5px;
}
.mr-20 {
  margin-right: 20px;
}
.num-bd {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 27.51px;
  color: #000000;
}
.text-bd {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 27.51px;
  color: #657786;
}

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
  border-left: 1px #e6ecf0 solid;
  border-right: 1px #e6ecf0 solid;
}
.main-content .header {
  width: 100%;
  height: 55px;
  border-bottom: 1px #e6ecf0 solid;
}
.main-content .header .back-icon {
  width: 17px;
  height: 14px;
  margin: 20px 0 21px 19px;
}
.main-content .header p {
  width: 100px;
  height: 26px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 26px;
  color: #1c1c1c;
  margin: 14px auto 15px 43px;
}
.twitter-bar {
  height: 397px;
  position: relative;
  border-bottom: 1px solid #e6ecf0;
}
.twitter-bar-container {
  width: 570px;
  margin: 0 auto 0 auto;
}
.profile-avater {
  width: 50px;
  height: 50px;
  margin: 10px 0 auto 0;
  border-radius: 50%;
}
.card-content {
  width: 56px;
  height: 33px;
  margin: 18px auto auto 10px;
}
.card-name {
  margin: 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #1c1c1c;
}
.card-account {
  margin: 3px 0 0 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}
.content-description .content-text {
  width: 510px;
  height: 136px;
  margin: 15px auto 0 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 34px;
  color: #1c1c1c;
}
.reply-time {
  width: 192px;
  height: 22px;
  margin: 15px auto 0 0;
}
.reply-time p {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}
.function-bar {
  height: 68px;
  margin: 15px auto 0 0;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
}
.function-bar p {
  margin-top: auto;
  margin-bottom: auto;
}
.icon-bar {
  height: 59px;
}
.icon-bar img {
  width: 25px;
  height: 25px;
  margin: 21px 155px auto 0;
}
.twitter-cards {
  max-height: 749px;
  overflow-y: scroll;
  overflow-x: hidden;
}
/* Modal  */
.modal-content {
  width: 600px;
  height: 450px;
  background: #ffffff;
  border-radius: 14px;
}
.header {
  height: 54px;
  position: relative;
}
.modal-content .twitter-bar {
  margin-top: 18px;
  position: relative;
  border-bottom: none;
}
.header .cancle-icon {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 19.5px;
  left: 19.5px;
}
.content-bar .profile-avater {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0px 10px auto 15px;
}
.content-bar .content-description {
  width: 510px;
  height: 123px;
  display: flex;
  flex-direction: column;
}
.content-description .description-head {
  width: 510px;
  height: 22px;
  display: flex;
}
.content-description .description-head .head-name {
  margin: 0;
  /* margin-left: 5px; */
  height: 22px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}
.content-description .description-head .head-account-time {
  margin: 0;
  width: 112px;
  height: 22px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}
.content-description .description-content {
  width: 510px;
  height: 66px;
  margin: 5px auto 18px 0;
}
.content-description .description-content p {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
  margin: 0;
}
.content-description .description-footer {
  width: 90px;
  height: 13px;
  display: flex;
  margin: 5px 0 0 0;
}
.content-description .description-footer .reply-for {
  width: 40px;
  height: 13px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #657786;
  margin: 0;
}
.content-description .description-footer .reply-account {
  width: 50px;
  height: 13px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #ff6600;
  margin: 0;
}
.reply-bar {
  display: flex;
  margin-top: 23px;
  position: relative;
}
.reply-bar::before {
  content: "";
  width: 2px;
  height: 90px;
  background: #ccd6dd;
  position: absolute;
  top: -93px;
  left: 39px;
}
.reply-bar .form-group {
  margin: 0;
}
.reply-bar .reply-avater {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 10px auto 15px;
}
.reply-bar .twitter-input {
  width: 510px;
  height: 26px;
  border: none;
  margin-top: 12px;
}
.twitter-bar .btn-submit {
  width: 64px;
  height: 40px;
  position: absolute;
  right: 15px;
  top: 148px;
  background: #ff6600;
  border-radius: 100px;
  padding: 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: white;
}
</style>