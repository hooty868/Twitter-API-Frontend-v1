<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar :navbar-status="status" />
      </div>
      <div class="main-group col-3 h-100">
        <div class="header"><p>上線使用者(5)</p></div>
        <div class="group-usercards">
          <div class="user-card d-flex">
            <img
              src="https://upload.cc/i1/2020/12/24/EDZPAb.png"
              alt="avater"
            />
            <div class="user-content d-flex">
              <p class="user-name">Apple</p>
              <p class="user-account">@apple</p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-conversation col h-100">
        <div class="header"><p>公開聊天室</p></div>
        <div class="main-content">
          <div class="user-online">
            <p>apple 上線</p>
          </div>
          <div class="user-online">
            <p>cooper 上線</p>
          </div>
          <div class="conversation-content js-start">
            <img
              src="https://upload.cc/i1/2020/12/24/EDZPAb.png"
              alt="avatar"
            />
            <div class="content-description">
              <p class="description-text bg-grey">
                這個階段需要搭配自己的專案情況來做整合。如果說上一階段的功能可以用
                copy paste 來完成，那這階段的挑戰就是 copy paste
                之外還需要深度消化，知道自己在做什麼
              </p>
              <p class="description-time">下午4:21分</p>
            </div>
          </div>
          <div class="conversation-content js-end">
            <img
              src="https://upload.cc/i1/2020/12/24/EDZPAb.png"
              alt="avatar"
            />
            <div class="content-description">
              <p class="description-text bg-orange">
                現階段，不需要保存歷史訊息，使用者一旦重新整理訊息，歷史訊息就會消失
                也就是說「只有同時在聊天室裡的在線使用者」才能聊天
              </p>
              <p class="description-time">下午4:22分</p>
            </div>
          </div>
        </div>
        <div class="footer">
          <input
            id="message"
            type="text"
            name="message"
            v-model="message"
            autocomplete="message"
            placeholder="輸入訊息..."
            required
          />
          <img src="https://upload.cc/i1/2020/12/26/G6Kzb9.png" alt="output" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
// import Followers from "./../components/followers";
// import twitterList from "./../components/twitterList";
// import Spinner from "./../components/Spinner";
import twitterAPI from "./../apis/twitter";
import userAPI from "./../apis/users";
import followerAPI from "./../apis/followers";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    // Spinner,
    Navbar,
    // Followers,
    // twitterList,
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
  },
  data() {
    return {
      isLoading: true,
      status: "status1",
      message: "",
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
  margin: 0 auto 0 auto;
}
.setting-pannel {
  width: auto;
}
.main-group {
  width: 350px;
  padding: 0;
  border-left: 1px #e6ecf0 solid;
  border-right: 1px #e6ecf0 solid;
}
.main-group .header {
  width: 100%;
  height: 55px;
  border-bottom: 1px #e6ecf0 solid;
}
.main-group .header p {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
  color: #1c1c1c;
  padding-top: 15px;
  padding-left: 15px;
}
.group-usercards {
  max-height: 1145px;
}
.user-card {
  height: 70px;
  border-bottom: 1px #e6ecf0 solid;
  align-items: center;
}
.user-card img {
  margin-left: 8px;
  height: 50px;
  width: 50px;
}
.user-card .user-content {
  height: 22px;
  width: 250px;
}
.user-card .user-content p {
  margin: 0 0 0 6px;
  width: auto;
  line-height: 22px;
}
.user-card .user-content .user-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}
.user-card .user-content .user-account {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}
.main-conversation {
  width: 1200px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px #e6ecf0 solid;
}
.main-conversation .header {
  width: 100%;
  height: 55px;
  border-bottom: 1px #e6ecf0 solid;
}
.main-conversation .header p {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
  color: #1c1c1c;
  padding-top: 15px;
  padding-left: 15px;
}
.main-conversation .main-content {
  width: 100%;
  height: 1100px;
  display: flex;
  flex-direction: column;
}
.user-online {
  align-content: center;
  justify-content: center;
}
.user-online p {
  width: 20%;
  height: 30px;
  background: #ebf0f3;
  margin: 5px auto 10px auto;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
}
.js-start {
  align-content: center;
  justify-content: flex-start;
  padding-left: 30px;
}
.js-end {
  align-content: center;
  justify-content: flex-end;
  padding-right: 30px;
}
.conversation-content {
  width: 100%;
  height: auto;
  display: flex;
}
.conversation-content img {
  height: 50px;
  width: 50px;
  margin-right: 20px;
}
.conversation-content p {
  margin: 0;
}
.bg-orange {
  background: #ff6600;
  color: white;
}
.bg-grey {
  background: #ebf0f3;
}
.description-text {
  margin: 0;
  width: 300px;
  border-radius: 20px;
  padding: 5px 10px 5px 10px;
}
.content-description .description-time {
  margin: 0 0 0 10px;
}
.main-conversation .footer {
  display: flex;
  width: 100%;
  height: 40px;
}
.main-conversation .footer input {
  width: 80%;
  height: 30px;
  margin: 0 5% 0 5%;
  border-radius: 15px;
  border: none;
  background: #ebf0f3;
  padding: 0;
  padding-left: 5%;
}
.main-conversation .footer img {
  width: 30px;
  height: 30px;
}
</style>
