<template>
  <div class="twitter-cards w-100">
    <div
      class="comments-card w-100 d-flex"
      v-for="twitter in twitters"
      :key="twitter.id"
    >
      <img
        class="card-avater cursor-hand"
        :src="twitter.User.avatar"
        alt="avater"
        @click="profileLink(twitter.UserId)"
      />
      <div class="card-content flex-grow-1 cursor-hand">
        <div class="content-title d-flex" @click="profileLink(twitter.UserId)">
          <p class="user-name">{{ twitter.User.name }}</p>
          <p class="user-account">@{{ twitter.User.account }} ·</p>
          <p class="comment-date">{{ twitter.createdAt | fromNow }}</p>
        </div>
        <div class="content-description">
          <p class="content-text w-100" @click="twitterLink(twitter.id)">
            {{ twitter.description }}
          </p>
          <div class="button-pannel d-flex">
            <div
              class="reply-button d-flex"
              data-toggle="modal"
              data-target="#replyModal"
              @click="getTwitter(twitter.id)"
            >
              <img
                class="icon-img"
                src="https://upload.cc/i1/2020/12/24/xfD6YV.png"
                alt="icon"
              />
              <p class="reply-count">{{ twitter.repliedCount }}</p>
            </div>
            <div class="like-button d-flex">
              <div
                class="like-button-container d-flex"
                @click="Unliketwitter(twitter.id)"
                v-if="parseInt(twitter.isLiked, 10)"
                :disabled="isProcessing"
              >
                <img
                  id="unlike"
                  class="icon-img unlike"
                  src="https://upload.cc/i1/2020/12/24/LCl9BZ.png"
                  alt="icon"
                />
                <p class="like-count-fill">{{ twitter.likedCount }}</p>
              </div>
              <div
                class="unlike-button-container d-flex"
                @click="Liketwitter(twitter.id)"
                :disabled="isProcessing"
                v-else
              >
                <img
                  id="like"
                  class="icon-img like"
                  src="https://upload.cc/i1/2020/12/24/XL7fKH.png"
                  alt="icon"
                />
                <p class="like-count">{{ twitter.likedCount }}</p>
              </div>
            </div>
          </div>
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
              src="https://upload.cc/i1/2020/12/24/RSJ94l.png"
              alt="cancle"
              data-dismiss="modal"
            />
          </div>
          <div class="twitter-bar d-flex flex-column">
            <div class="content-bar d-flex">
              <img
                class="profile-avater"
                :src="twitterDetail.User.avatar"
                alt="avater"
              />
              <div class="content-description">
                <div class="description-head">
                  <p class="head-name">{{ twitterDetail.User.name }}</p>
                  <p class="head-account-time">
                    @{{ twitterDetail.User.account }} ·
                    {{ twitterDetail.createdAt | fromNow }}
                  </p>
                </div>
                <div class="description-content">
                  <p>
                    {{ twitterDetail.description }}
                  </p>
                </div>
                <div class="description-footer">
                  <p class="reply-for">回覆給</p>
                  <p class="reply-account">
                    ＠{{ twitterDetail.User.account }}
                  </p>
                </div>
              </div>
            </div>
            <div class="reply-bar">
              <img
                class="reply-avater"
                :src="userprofile.avatar"
                alt="avater"
              />
              <form
                class="form-group"
                @submit.stop.prevent="replytwitter(twitterDetail.id)"
              >
                <input
                  id="twitter"
                  v-model="Replytwitter"
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
  </div>
</template>

<script>
import twitterAPI from "./../apis/twitter";
import { Toast } from "./../utils/helpers";
import { fromNowFilter } from "./../utils/mixins";

export default {
  mixins: [fromNowFilter],
  props: {
    repliedTwitter: {
      type: Object,
      required: true,
    },
    Twitters: {
      type: Array,
      required: true,
    },
    userProfile: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.fetchList();
  },
  watch: {
    repliedTwitter(newValue) {
      this.twitters.unshift(newValue);
    },
    Twitters(newValue) {
      this.twitters = newValue;
    },
    twitterDetail(newValue) {
      this.twitterDetail = newValue;
    },
  },
  methods: {
    fetchList() {
      this.twitters = this.Twitters;
      this.userprofile = this.userProfile;
    },
    getTwitter(twitterId) {
      this.userprofile = {
        ...this.userProfile,
      };
      const twitter = this.twitters.filter((twitter) => {
        if (twitter.id === twitterId) {
          return twitter;
        }
      });
      this.twitterDetail = twitter[0];
    },
    profileLink(userId) {
      this.$router.push({ name: "profile", params: { id: userId } });
    },
    twitterLink(twitterId) {
      this.$router.push({ name: "twitterDetail", params: { id: twitterId } });
    },
    async Liketwitter(twitterId) {
      this.isProcessing = true;
      try {
        const response = await twitterAPI.likeTwitter(twitterId);
        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.twitters = this.twitters.map((twitter) => {
          if (twitter.id === twitterId) {
            twitter.isLiked = 1;
            twitter.likedCount++;
            return twitter;
          } else {
            return twitter;
          }
        });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
    async Unliketwitter(twitterId) {
      this.isProcessing = true;
      try {
        const response = await twitterAPI.unlikeTwitter(twitterId);
        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.twitters = this.twitters.map((twitter) => {
          if (twitter.id === twitterId) {
            twitter.isLiked = 0;
            twitter.likedCount--;
            return twitter;
          } else {
            return twitter;
          }
        });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
    async replytwitter(twitterId) {
      try {
        if (this.Replytwitter.length > 140) {
          throw new Error("字數不可以超過140個字");
        } else if (this.Replytwitter.length === 0) {
          throw new Error("不可以輸入空白");
        }
        const response = await twitterAPI.replyTwitter(twitterId, {
          comment: this.Replytwitter,
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
      this.Replytwitter = "";
    },
  },
  data() {
    return {
      Replytwitter: "",
      isProcessing: false,
      twitters: [],
      twitterDetail: {
        User: {
          name: "",
          account: "",
          avatar: "",
        },
        description: "",
      },
      twitter: "",
      userprofile: {
        account: "",
        avatar: "",
        cover: "",
        email: "user2@example.com",
        followerCount: -1,
        followingCount: 1,
        id: -1,
        introduction: "",
        isFollowed: -1,
        name: "",
        tweetCount: -1,
      },
    };
  },
};
</script>

<style scoped>
.twitter-cards {
  max-height: 1025px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.comments-card {
  border-bottom: 1px #e6ecf0 solid;
}
.comments-card:hover {
  background: #f0f0f0;
}
.card-avater {
  width: 50px;
  height: 50px;
  margin: 13px 10px auto 15px;
  border-radius: 50%;
}
.content-title {
  width: 510px;
  height: 22px;
}
.content-title p {
  margin: 10px 5px 6px 0;
}
.user-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}
.user-account {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}
.comment-date {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}
.content-description {
  width: 510px;
  height: 107px;
  position: relative;
}
.content-description p {
  margin: 10px auto 14px 0;
}
.button-pannel {
  position: absolute;
  bottom: 13px;
}
.icon-img {
  width: 12.34px;
  height: 12.34px;
  margin: 0 11.35px 0 0;
}
.content-description .reply-count {
  margin: 0 51px 0 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #657786;
}
.content-description .like-count {
  margin: 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #657786;
}
.like-button .like-count-fill {
  margin: 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #e0245e;
}
::-webkit-scrollbar {
  /*隱藏滾輪*/
  display: none;
}
.content-text:hover {
  opacity: 0.5;
  transition: opacity 0.2s ease-out;
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
  border-bottom: 1px solid #e6ecf0;
}
.twitter-bar {
  margin-top: 18px;
  position: relative;
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
  white-space: nowrap;
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
  margin-left: 5px;
  width: auto;
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