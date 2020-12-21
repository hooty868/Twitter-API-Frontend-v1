<template>
  <div class="twitter-cards w-100">
    <div
      class="comments-card w-100 d-flex"
      v-for="twitter in twitters"
      :key="twitter.id"
    >
      <img class="card-avater" :src="twitter.User.avatar" alt="avater" />
      <div class="card-content flex-grow-1">
        <div class="content-title d-flex">
          <p class="user-name">{{ twitter.User.name }}</p>
          <p class="user-account">@{{ twitter.User.account }} ·</p>
          <p class="comment-date">3小時</p>
        </div>
        <div class="content-description">
          <p class="content-text w-100">
            {{ twitter.description }}
          </p>
          <div class="button-pannel d-flex">
            <div class="reply-button d-flex">
              <img class="icon-img" src="/image/reply_icon.png" alt="icon" />
              <p class="reply-count">{{ twitter.repliedCount }}</p>
            </div>
            <div class="like-button d-flex">
              <img class="icon-img" src="/image/like_icon.png" alt="icon" />
              <p class="like-count">{{ twitter.likedCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    repliedTwitter: {
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
    fetchList() {
      this.twitters = this.Twitters;
    },
  },
  data() {
    return {
      twitters: [],
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
</style>