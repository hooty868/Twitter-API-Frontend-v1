<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar />
      </div>
      <div class="main-content col h-100">
        <div class="header pl-3">
          <img
            @click="$router.back()"
            src="https://upload.cc/i1/2020/12/24/oBeWkX.png"
            alt=""
          />

          <div class="header-content">
            <p class="name">{{ user.name }}</p>
            <p class="twitter">{{ user.tweetCount }}推文</p>
          </div>
        </div>

        <div class="user-tweet">
          <div class="content-control d-flex">
            <div
              class="tweets content"
              v-bind:class="{ active: showContent.follower }"
              v-on:click="showfollower()"
            >
              跟隨者
            </div>
            <div
              class="response content"
              v-bind:class="{ active: showContent.following }"
              v-on:click="showfollowing()"
            >
              正在跟隨
            </div>
          </div>
          <div class="content-render">
            <Follower v-if="showContent.follower" />
            <Following v-show="showContent.following" />
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
import Follower from "./../components/follower";
import Following from "./../components/following";
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
    Follower,
    Following,
  },
  data() {
    return {
      isFollowed: true,
      user: {},
      showContent: {
        follower: true,
        following: false,
      },
      followerlist: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUsers(userId);
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
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },

    showfollower() {
      this.showContent.follower = true;
      this.showContent.following = false;
    },
    showfollowing() {
      this.showContent.follower = false;
      this.showContent.following = true;
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

.main-content .header img {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.main-content .header img:hover {
  opacity: 0.5;
  transition: transform 0.2s ease-out;
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

.user-tweet {
  width: 100%;
  height: 50px;
  margin-top: 26px;
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
</style>