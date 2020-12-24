<template>
  <div class="container">
    <form class="form-group w-100" @submit.stop.prevent="handleSubmit">
      <div class="logo-container text-center">
        <img
          class="logo"
          src="https://upload.cc/i1/2020/12/24/MLqwE5.png"
          alt="Logo"
        />
      </div>
      <div class="brand-container text-center">
        <h1 class="brand h3">建立你的帳號</h1>
      </div>
      <div class="form-label-group">
        <label for="account">帳號</label>
        <input
          id="account"
          name="account"
          v-model="account"
          type="account"
          class="form-input form-control"
          placeholder=""
          autocomplete="account"
          required
          v-focus
        />
      </div>
      <div class="form-label-group">
        <label for="name">名稱</label>
        <input
          id="name"
          name="name"
          v-model="name"
          type="text"
          class="form-input form-control"
          placeholder=""
          autocomplete="username"
          requiredx
        />
      </div>

      <div class="form-label-group">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          v-model="email"
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
          v-model="password"
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
          v-model="passwordCheck"
          type="password"
          class="form-input form-control"
          placeholder=""
          autocomplete="new-password"
          required
        />
      </div>

      <button class="btn btn-lg btn-submit btn-block mb-3" type="submit">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">取消</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            icon: "warning",
            title: "請確認已填寫所有欄位",
          });
          return;
        }
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "兩次輸入的密碼不同",
          });
          this.passwordCheck = "";
          return;
        }

        const checkData = {
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.passwordCheck,
        };
        let { data } = await authorizationAPI.signUp(checkData);
        if (data.status === "error") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        this.$router.push("/signin");
      } catch (e) {
        // TODO: 向後端驗證使用者登入資訊是否合法
        Toast.fire({
          icon: "warning",
          title: `無法註冊 - ${e.message}`,
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

