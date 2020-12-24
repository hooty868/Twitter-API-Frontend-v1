<template>
  <div
    class="followers-container"
    :class="{ newfollowerscontainer: cardsSpread }"
  >
    <div class="header w-100"><p>首頁</p></div>
    <div
      class="follower-cards w-100"
      :class="{ newfollowercards: cardsSpread }"
    >
      <div
        class="follower-card w-100 d-flex"
        v-for="follower in followers"
        :key="follower.followingId"
      >
        <img class="profile-avater" :src="follower.avatar" alt="avater" />
        <div class="card-content">
          <p class="card-name">{{ follower.name }}</p>
          <p class="card-account">@{{ follower.account }}</p>
        </div>
        <button
          class="btn btn-lg btn-submit isfollowered btn-block mb-3"
          type="submit"
          v-if="parseInt(follower.isFollowed, 10)"
          @click.stop.prevent="deletFollower(follower.followingId)"
          :disabled="isProcessing"
        >
          正在跟隨
        </button>
        <button
          class="btn btn-lg btn-submit nonfollowered btn-block mb-3"
          type="submit"
          @click.stop.prevent="addFollower(follower.followingId)"
          :disabled="isProcessing"
          v-else
        >
          跟隨
        </button>
      </div>
    </div>
    <div class="footer" v-if="!cardsSpread" @click="tansferCards">
      <p>顯示更多</p>
    </div>
  </div>
</template>

<script>
import followerAPI from "./../apis/followers";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    followerList: {
      type: Array,
      required: true,
    },
    userProfile: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.fetchUser();
  },
  watch: {
    followerList(newValue) {
      this.followers = [...this.followers, ...newValue];
    },
  },
  methods: {
    tansferCards() {
      this.cardsSpread = true;
    },
    fetchUser() {
      this.followers = this.followerList;
    },
    async addFollower(followerId) {
      this.isProcessing = true;
      try {
        const response = await followerAPI.isFollower(followerId);
        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.followers = this.followers.map((follower) => {
          if (follower.followingId === followerId) {
            follower.isFollowed = 1;
            return follower;
          } else {
            return follower;
          }
        });
      } catch (error) {
        console.log("add", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
      this.isProcessing = false;
    },
    async deletFollower(followerId) {
      this.isProcessing = true;
      try {
        const response = await followerAPI.deletFollower(followerId);
        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.followers = this.followers.map((follower) => {
          if (follower.followingId === followerId) {
            follower = {
              ...follower,
              isFollowed: 0,
            };
            return follower;
          } else {
            return follower;
          }
        });
      } catch (error) {
        console.log("delete", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
      this.isProcessing = false;
    },
  },
  data() {
    return { isProcessing: false, followers: [], cardsSpread: false };
  },
};
</script>

<style scoped>
.followers-container {
  width: 350px;
  height: 517px;
  background: #f5f8fa;
  border-radius: 14px;
  margin: 15px auto auto 15px;
  position: relative;
}
.newfollowerscontainer {
  height: 760px;
}
.header {
  height: 45px;
  border-bottom: 1px #e6ecf0 solid;
}
.header p {
  width: 54px;
  height: 26px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #1c1c1c;
  margin: 0px auto auto 15px;
  padding-top: 10px;
}
.follower-cards {
  max-height: 425px;
  overflow-y: hidden;
}
.newfollowercards {
  max-height: 701px;
}
.follower-card {
  background: none;
  border: none;
  height: 70px;
  border-bottom: 1px #e6ecf0 solid;
}
.profile-avater {
  width: 50px;
  height: 50px;
  margin: auto 10px auto 15px;
  border-radius: 50%;
}
.card-content {
  width: 79px;
  height: 33px;
  margin: auto 0 auto 0;
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
.isfollowered {
  width: 92px;
  height: 30px;
  padding: 0;
  margin: auto 15px auto auto;
  font-size: 15px;
  line-height: 15px;
}
.nonfollowered {
  width: 62px;
  height: 30px;
  background: none;
  border: 1px solid #ff6600;
  color: #ff6600;
  padding: 0;
  margin: auto 15px auto auto;
}
.footer {
  width: 60px;
  height: 22px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #ff6600;
  position: absolute;
  bottom: 12px;
  left: 15px;
}
</style>