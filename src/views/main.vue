<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar
          @after-create-twitter="afterCreateTwitter"
          :navbar-status="status"
        />
      </div>
      <div class="main-content col h-100">
        <div class="header"><p>首頁</p></div>
        <div class="twitter-bar d-flex">
          <img class="profile-avater" :src="UserProfile.avatar" alt="avater" />
          <form class="form-group" @submit.stop.prevent="handleSubmit">
            <input
              id="twitter-main"
              v-model="twitter"
              name="twitter"
              type="twitter"
              class="twitter-input form-control"
              autocomplete="twitter"
              placeholder="有什麼新鮮事？"
              required
            />
            <button class="btn btn-lg btn-submit btn-block mb-3" type="submit">
              推文
            </button>
          </form>
        </div>
        <Spinner v-if="isLoading" />
        <twitterList
          :replied-twitter="repliedTwitter"
          :Twitters="twitters"
          :user-profile="UserProfile"
          v-else
        />
      </div>
      <div class="main-follower col-4 h-100">
        <Spinner v-if="isLoading" />
        <Followers
          :user-profile="UserProfile"
          :follower-list="followerlist"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import Followers from "./../components/followers";
import twitterList from "./../components/twitterList";
import Spinner from "./../components/Spinner";
import twitterAPI from "./../apis/twitter";
import userAPI from "./../apis/users";
import followerAPI from "./../apis/followers";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    Spinner,
    Navbar,
    Followers,
    twitterList,
  },
  created() {
    this.fetchtwitterList();
    this.fetchUserprofile();
    this.fetchFollowerList();
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    async fetchtwitterList() {
      try {
        const response = await twitterAPI.TwitterAll();
        this.twitters = response.data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
    async fetchUserprofile() {
      try {
        const Newdata = await userAPI.getCurrentUser();
        const userId = Newdata.data.id;
        this.UserId = userId;
        const response = await userAPI.UserProfile(userId);
        this.UserProfile = response.data;
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
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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
    async handleSubmit() {
      try {
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
  },
  data() {
    return {
      isLoading: true,
      status: "status1",
      twitter: "",
      UserId: "",
      UserProfile: {},
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
  border-bottom: 2px #e6ecf0 solid;
}
.main-content .header p {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
  color: #1c1c1c;
  padding-top: 15px;
  padding-left: 15px;
}
.twitter-bar {
  height: 120px;
  border-bottom: 10px #e6ecf0 solid;
  position: relative;
}
.profile-avater {
  width: 50px;
  height: 50px;
  margin: 10px auto auto 15px;
  border-radius: 50%;
}
.form-group {
  margin: 0;
  width: 510px;
  height: 26px;
  margin: 21px auto auto 10px;
}
.twitter-input {
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  padding: 0;
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
  top: 60px;
  right: 15px;
}
</style>