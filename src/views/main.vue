<template>
  <div class="container">
    <div class="row">
      <div class="setting-pannel col-3">
        <Navbar
          @after-create-twitter="afterCreateTwitter"
          :navbar-status="status"
        />
      </div>
      <div class="main-content col-5 h-100">
        <div class="header"><p>首頁</p></div>
        <TwitterPost
          :user-profile="UserProfile"
          @after-create-twitter="afterCreateTwitter"
        />
        <Spinner v-if="isLoading" />
        <TwitterList
          :replied-twitter="repliedTwitter"
          :Twitters="twitters"
          :user-profile="UserProfile"
          v-else
        />
      </div>
      <div class="main-follower col-4">
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
import TwitterList from "./../components/twitterList";
import TwitterPost from "./../components/twitterPost";
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
    TwitterList,
    TwitterPost,
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
    async fetchFollowerList() {
      try {
        const response = await followerAPI.TopUsers();
        this.followerlist = response.data;
        this.isLoading = false;
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
/* grid layout css set */
.container {
  max-width: 1440px;
  height: 1200px;
  margin: 0 auto 0 auto;
}
.container .row {
  height: 100%;
}
.navbar {
  margin: 0 25px auto auto;
}
.main-content {
  width: 100%;
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
@media (max-width: 1410px) {
  .main-content {
    max-width: 480px;
  }
}
@media (max-width: 1200px) {
  .container .row {
    all: unset;
  }
  .container .row {
    height: 100%;
    display: grid;
    grid-template-areas:
      "setting content"
      "follower content";
    grid-template-rows: 500px 1fr;
    grid-template-columns: 45% 55%;
  }
  .setting-pannel {
    max-width: 100%;
    grid-area: setting;
    height: 100vh;
  }
  .main-content {
    grid-area: content;
    height: 100%;
    max-width: 450px;
  }
  .main-follower {
    grid-area: follower;
    max-width: 100%;
    padding: 0 15px 0 0;
  }
  .main-follower .followers-container {
    margin: 15px 0 auto auto;
  }
}
@media (max-width: 400px) {
  .container .row {
    all: initial;
  }
  .row .setting-pannel {
    height: 1px;
    max-width: 550px;
  }
  .row .main-content {
    height: 1px;
    max-width: 550px;
  }
  .main-content .twitter-bar-container {
    max-width: 375px;
  }
  .main-follower {
    display: none;
  }
}
</style>