<template>
  <div class="container py-5">
    <form class="form-group w-100" @submit.prevent.stop="handleSubmit">
      <div class="logo-container text-center">
        <img
          class="logo"
          src="https://upload.cc/i1/2020/12/24/MLqwE5.png"
          alt="Logo"
        />
      </div>
      <div class="brand-container text-center">
        <h1 class="brand h3">登入 Alphitter</h1>
      </div>
      <div class="form-label-group">
        <label for="account">帳號</label>
        <input
          id="account"
          v-model="account"
          name="account"
          type="account"
          class="form-input form-control cursor-hand"
          autocomplete="account"
          required
          v-focus
        />
      </div>

      <div class="form-label-group">
        <label for="password">密碼</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-input form-control cursor-hand"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        class="btn-submit btn btn-lg btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        登入
      </button>

      <div class="text-right d-flex justify-content-end mb-3">
        <router-link to="/signup"><p>註冊 Alphitter·</p></router-link>
        <router-link to="/admin/signin"><p>後台登入</p></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
// import axios from "axios";

export default {
  data() {
    return {
      account: "",
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入 account 和 password",
          });
          return;
        }
        this.isProcessing = true;
        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password,
        });
        const { data } = response;
        if (data.status !== "success" || data.user.role !== "user") {
          throw new Error(data.message);
        }
        localStorage.setItem("token", data.token);
        this.$store.commit("setCurrentUser", data.user);

        this.$router.push("/main");
      } catch (error) {
        this.password = "";
        this.isProcessing = false;

        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的帳號密碼",
        });
      }
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

<style>
.cursor-hand {
  cursor: pointer;
}
.form-group {
  max-width: 540px;
  margin: 0 auto 0 auto;
}
.container {
  max-width: 1440px;
  height: 1200px;
  margin: 60px auto 30px auto;
}
.logo-container {
  margin-bottom: 35px;
}
.logo {
  max-height: 50px;
  max-width: 50px;
}
.brand-container {
  margin-bottom: 20px;
}
.brand {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 33px;
}
.form-label-group {
  position: relative;
  margin-bottom: 20px;
}
.form-label-group:hover::after {
  content: "";
  width: 99%;
  height: 2px;
  background: #657786;
  border-radius: 0px 0px 4px 4px;
  position: absolute;
  left: 0.5%;
  transform: scale(0, 0);
  transition: transform 0.4s ease-out;
}
.form-label-group::after {
  content: "";
  width: 99%;
  height: 2px;
  background: #657786;
  border-radius: 0px 0px 4px 4px;
  position: absolute;
  left: 0.5%;
  transform: scale(1, 1);
}
.form-label-group label {
  position: absolute;
  top: 5px;
  left: 10px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}
.form-input {
  border: none;
  background: #f5f8fa;
  border-radius: 4px;
  width: 540px;
  height: 50px;
  padding: 0;
  padding-top: 20px;
  padding-left: 10px;
}
.btn-submit {
  width: 540px;
  height: 50px;
  background: #ff6600;
  border-radius: 50px;
  color: #fff;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  margin-top: 30px;
}
</style>
