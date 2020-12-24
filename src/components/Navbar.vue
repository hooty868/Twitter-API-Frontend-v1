<template>
  <nav class="navbar d-flex flex-column justify-content-between">
    <div class="pannel-container">
      <div class="logo-container">
        <router-link to="/main" class="button-link">
          <img
            class="logo"
            src="https://upload.cc/i1/2020/12/24/MLqwE5.png"
            alt="Logo"
          />
        </router-link>
      </div>
      <router-link to="/main" class="button-link">
        <div class="pannel-icon-container d-flex">
          <img
            class="pannel-icon"
            src="https://upload.cc/i1/2020/12/24/tk5EOf.png"
            alt="Index"
            v-if="status === 'status1'"
          />
          <img
            class="pannel-icon"
            src="https://upload.cc/i1/2020/12/24/N9vPcY.png"
            alt="Index"
            v-else
          />
          <h1
            class="pannel-icon-text main"
            :class="{ colorOrange: status === 'status1' }"
          >
            首頁
          </h1>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'profile', params: { id: currentuser.id } }"
        class="button-link"
      >
        <div class="pannel-icon-container d-flex">
          <img
            class="pannel-icon"
            src="https://upload.cc/i1/2020/12/24/RFLOhD.png"
            alt="Profile"
            v-if="status === 'status2'"
          />
          <img
            class="pannel-icon"
            src="https://upload.cc/i1/2020/12/24/T9gfR2.png"
            alt="Profile"
            v-else
          />
          <h1
            class="pannel-icon-text"
            :class="{ colorOrange: status === 'status2' }"
          >
            個人資料
          </h1>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'setting', params: { id: currentuser.id } }"
        class="button-link"
      >
        <div class="pannel-icon-container d-flex">
          <img
            class="pannel-icon"
            src="https://upload.cc/i1/2020/12/24/ctvaJL.png"
            alt="Setting"
            v-if="status === 'status3'"
          />
          <img
            class="pannel-icon"
            src="https://upload.cc/i1/2020/12/24/OEmSBo.png"
            alt="Setting"
            v-else
          />
          <h1
            class="pannel-icon-text setting"
            :class="{ colorOrange: status === 'status3' }"
          >
            設定
          </h1>
        </div>
      </router-link>

      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-lg btn-submit btn-block mb-3"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        推文
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="header">
              <img
                class="cancle-icon"
                src="/image/cancle_icon.png"
                alt="cancle"
                data-dismiss="modal"
              />
            </div>
            <div class="twitter-bar d-flex">
              <img
                class="profile-avater"
                :src="currentuser.avatar"
                alt="avater"
              />
              <form class="form-group" @submit.stop.prevent="handleSubmit">
                <input
                  id="twitter"
                  v-model="twitter"
                  name="twitter"
                  type="twitter"
                  class="twitter-input"
                  autocomplete="twitter"
                  placeholder="有什麼新鮮事？"
                  required
                  v-focus
                />
                <button
                  class="btn btn-lg btn-twitter btn-block mb-3"
                  type="submit"
                  block
                >
                  推文
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="logOut-contaier">
      <div class="pannel-icon-container d-flex" @click="logout">
        <img
          class="pannel-icon"
          src="https://upload.cc/i1/2020/12/24/d0kUL7.png"
          alt="Setting"
        />
        <h1 class="pannel-icon-text">登出</h1>
      </div>
    </div>
  </nav>
</template>

<script>
import userAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    navbarStatus: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      twitter: "",
      UserId: "",
      currentuser: {
        account: "",
        avatar: "",
        cover: "",
        email: "",
        followerCount: -1,
        followingCount: -1,
        id: -1,
        introduction: "",
        isFollowed: -1,
        name: "",
        tweetCount: -1,
      },
      isAuthenticated: false,
      status: "",
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      this.status = this.navbarStatus;
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
    handleSubmit() {
      this.$emit("after-create-twitter", {
        Description: this.twitter,
      });
      this.twitter = "";
    },
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>

<style scoped>
.colorOrange {
  color: #ff6600 !important;
}
.navbar {
  height: 100%;
  width: 235px;
  padding: 0;
  margin: 4px auto auto 103px;
}
.pannel-container {
  width: 100%;
}
.logo-container {
  margin-top: 14px;
}
.logo {
  height: 30px;
  width: 30px;
}
.button-link {
  color: #1c1c1c;
  text-decoration: none;
  background-color: none;
}
.button-link:-webkit-any-link {
  color: #1c1c1c;
}
.pannel-icon-container {
  width: 100%;
  height: 60px;
}
.pannel-icon {
  width: 22.2px;
  height: 20.25px;
  margin: auto 0 auto 0;
}
.pannel-icon-text {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 60px;
  margin: auto 0 auto 20px;
}
.main {
  color: black;
}
.btn-submit {
  height: 45px;
  width: 210px;
  margin-top: 20px;
}
.logOut-contaier {
  width: 100%;
}
/*modal style setting*/
.modal-content {
  width: 600px;
  height: 300px;
  background: #ffffff;
  border-radius: 14px;
  position: relative;
}
.modal-content .header {
  width: 600px;
  height: 40px;
  margin-top: 15px;
  border-bottom: 1px solid #e6ecf0;
}
.modal-content .header img {
  height: 15px;
  width: 15px;
  position: absolute;
  top: 19.5px;
  left: 19.5px;
}
.profile-avater {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 15px 10px auto 15px;
}
.form-group {
  margin: 0;
}
.twitter-input {
  border: none;
  width: 510px;
  height: auto;
  margin-top: 27px;
  word-break: break-all;
}
.btn-twitter {
  width: 64px;
  height: 40px;
  background: #ff6600;
  border-radius: 50px;
  color: #fff;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  position: absolute;
  bottom: 15px;
  right: 15px;
  margin: 0;
  padding: 0;
}
</style>