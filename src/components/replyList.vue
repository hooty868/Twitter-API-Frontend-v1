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
      <div class="card-content flex-grow-1">
        <div
          class="content-title d-flex cursor-hand"
          @click="profileLink(twitter.UserId)"
        >
          <p class="user-name">{{ twitter.User.name }}</p>
          <p class="user-account">@{{ twitter.User.account }} ·</p>
          <p class="comment-date">{{ twitter.createdAt | fromNow }}</p>
        </div>
        <div class="content-description-reply d-flex">
          <p class="content-text">回覆</p>
          <p class="content-text coler-orange">
            ＠{{ userprofile.User.account }}
          </p>
        </div>
        <div class="content-description-content mb-15">
          <p class="content-text w-100">
            {{ twitter.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";

export default {
  mixins: [fromNowFilter],
  props: {
    userProfile: {
      type: Object,
      required: true,
    },
    Twitters: {
      type: Array,
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
  },
  methods: {
    profileLink(userId) {
      this.$router.push({ name: "profile", params: { id: userId } });
    },
    fetchList() {
      this.twitters = this.Twitters;
      this.userprofile = this.userProfile;
    },
  },
  data() {
    return {
      twitters: [],
      userprofile: {},
      twitter: "",
      twitterReply: "",
    };
  },
};
</script>

<style scoped>
.coler-orange {
  color: #ff6600;
}
.twitter-cards {
  max-height: 1025px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.comments-card {
  height: 145px;
  border-bottom: 1px #e6ecf0 solid;
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
.content-description-reply {
  width: 89px;
  height: 22px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
  margin-top: 15px;
}
.content-description-content {
  width: 510px;
  height: 22px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
  margin: 5px auto 15px 0;
}
.content-description-content p {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}
::-webkit-scrollbar {
  /*隱藏滾輪*/
  display: none;
}
</style>