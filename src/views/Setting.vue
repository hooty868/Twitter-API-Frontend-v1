<template>
  <div class="container d-flex">
    <div class="setting-pannel">
      <Navbar :navbar-status="status" />
    </div>
    <Spinner v-if="isLoading" />
    <div class="main-content" v-else>
      <div class="header"><p>帳戶設定</p></div>
      <form
        class="form-group w-100"
        @submit.stop.prevent="handleSubmit(UserId)"
      >
        <div class="form-label-group">
          <label for="account">帳號</label>
          <input
            id="account"
            name="account"
            v-model="userProfile.account"
            type="account"
            class="form-input form-control"
            placeholder=""
            autocomplete="account"
            required
            autofocus
          />
        </div>
        <div class="form-label-group">
          <label for="name">名稱</label>
          <input
            id="name"
            name="name"
            v-model="userProfile.name"
            type="text"
            class="form-input form-control"
            placeholder=""
            autocomplete="username"
            required
            autofocus
          />
        </div>

        <div class="form-label-group">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            v-model="userProfile.email"
            type="email"
            class="form-input form-control"
            placeholder=""
            autocomplete="email"
            required
          />
        </div>

        <div class="form-label-group">
          <label for="password">密碼</label>
          <input
            id="password"
            name="password"
            v-model="userProfile.password"
            type="password"
            class="form-input form-control"
            placeholder=""
            autocomplete="new-password"
            required
          />
        </div>

        <div class="form-label-group">
          <label for="password-check">密碼確認</label>
          <input
            id="password-check"
            name="passwordCheck"
            v-model="userProfile.checkPassword"
            type="password"
            class="form-input form-control"
            placeholder=""
            autocomplete="new-password"
            required
          />
        </div>

        <button
          class="btn btn-lg btn-submit btn-block mb-3"
          type="submit"
          :disabled="isProcessing"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import Spinner from "./../components/Spinner";
import userAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    Spinner,
    Navbar,
  },
  data() {
    return {
      isLoading: true,
      status: "status3",
      userProfile: {
        account: "",
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
      },
      isProcessing: false,
      UserId: "",
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUserProfile(id);
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        this.UserId = userId;
        const { data } = await userAPI.UserProfile(userId);
        const { account, name, email } = data;
        this.userProfile = {
          account: account,
          name: name,
          email: email,
          password: "",
          checkPassword: "",
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資訊，請稍後再試",
        });
      }
    },
    async handleSubmit(userId) {
      try {
        this.isProcessing = true;
        const response = await userAPI.UpdateUserSettingProfile(userId, {
          account: this.userProfile.account,
          name: this.userProfile.name,
          email: this.userProfile.email,
          password: this.userProfile.password,
          checkPassword: this.userProfile.checkPassword,
        });
        console.log(response);
        // if (data.status !== "success") {
        //   throw new Error(data.message);
        // }

        this.$router.push({ name: "main" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資訊，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto 0 auto;
}
.setting-pannel {
  width: 378px;
  height: 100%;
  border-left: 2px #e6ecf0 solid;
}
.main-content {
  height: 100%;
  flex-grow: 1;
  border-left: 2px #e6ecf0 solid;
  border-right: 2px #e6ecf0 solid;
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
  margin-top: 13px;
  margin-left: 23.7px;
}
.form-group {
  margin: 30px auto auto 16px;
}
.btn-submit {
  width: 122px;
  margin: 30px 0px 0px auto;
}
</style>