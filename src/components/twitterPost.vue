<template>
  <div class="twitter-bar d-flex">
    <img
      class="profile-avater"
      :src="userprofile.avatar || 'https://upload.cc/i1/2021/01/07/Qp547R.png'"
      alt="avater"
    />
    <form class="form-group" @submit.stop.prevent="handleSubmit">
      <textarea
        id="twitter-main"
        class="twitter-input form-control"
        v-model="twitter"
        name="twitter"
        autocomplete="twitter"
        placeholder="有什麼新鮮事？"
        maxlength="140"
        required
      ></textarea>
      <button class="btn btn-lg btn-submit btn-block mb-3" type="submit">
        推文
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    userProfile: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.fetchList();
  },
  watch: {
    userProfile(newValue) {
      this.userprofile = {
        ...this.userprofile,
        ...newValue,
      };
    },
  },
  data() {
    return {
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
      repliedTwitter: {},
    };
  },
  methods: {
    fetchList() {
      this.userprofile = this.userProfile;
    },
    handleSubmit() {
      this.$emit("after-create-twitter", {
        Description: this.twitter,
      });
      this.twitter = "";
    },
  },
};
</script>

<style scoped>
.twitter-bar {
  max-height: 200px;
  border-bottom: 10px #e6ecf0 solid;
  padding-bottom: 12%;
  position: relative;
}
.profile-avater {
  width: 50px;
  height: 50px;
  margin: 10px 0 auto 15px;
  border-radius: 50%;
}
.form-group {
  margin: 0;
  width: 100%;
  height: auto;
  margin: 21px 0 0 10px;
}
.twitter-input {
  border: none;
  background: none;
  width: 100%;
  height: 90%;
  padding: 0 5px 5px 5px;
}
textarea {
  resize: none;
}
::-webkit-scrollbar {
  /*隱藏滾輪*/
  display: none;
}
.btn-submit {
  width: 64px;
  height: 40px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 62%;
  right: 5%;
}
</style>