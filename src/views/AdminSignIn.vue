// ./src/views/SignIn.vue
<template>
  <div class="container py-5 w-100">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <img alt="logo" src="https://upload.cc/i1/2020/12/24/MLqwE5.png" />

      <div class="mb-4">
        <h1 class="h3 mb-3 font-weight-normal">後台登入</h1>
      </div>
      <div class="form-label-group mb-2">
        <input
          v-model="account"
          id="account"
          name="account"
          type="account"
          placeholder="帳號"
          autocomplete="username"
          required
          autofocus
        />
      </div>
      <div class="form-label-group mb-3">
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          placeholder="密碼"
          autocomplete="current-password"
          required
        />
      </div>

      <button class="mb-3" type="submit" :disabled="isProcessing">登入</button>
    </form>
    <div class="link">
      <router-link to="/signin"> 前台登入 </router-link>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.account || !this.password) {
        Toast.fire({
          icon: "warning",
          title: "請填入 email 和 password",
        });
        return;
      }

      this.isProcessing = true;

      authorizationAPI
        .signIn({
          account: this.account,
          password: this.password,
        })
        .then((response) => {
          const { data } = response;

          if (data.status !== "success") {
            throw new Error(data.message);
          }

          if (data.user.role !== "admin") {
            throw new Error("這是沒有管理權限的帳號");
          }

          localStorage.setItem("token", data.token);
          this.$router.push("/admin/tweets");
        })
        .catch((error) => {
          // 將密碼欄位清空
          this.password = "";

          // 顯示錯誤提示
          Toast.fire({
            icon: "warning",
            title: "請確認您輸入了正確的帳號密碼",
          });
          this.isProcessing = false;
          console.log("error", error);
        });
    },
  },
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  background: #f5f8fa;
  display: block;
  border: none;
  border-bottom: 2px solid #657786;
  width: 540px;
  height: 50px;
}

input::placeholder {
  position: relative;
  top: -25%;
  left: 1%;
  font-size: 0.9rem;

  color: #657786;
}

button {
  background: #ff6600;
  border: 1px solid #ff6600;
  display: block;
  width: 540px;
  height: 50px;
  color: white;
  border-radius: 32px;
}

.link {
  width: 540px;
  height: 50px;
  margin: auto;
  text-align: end;
  font-weight: bold;
}
.link a {
  text-decoration: none;

  border-bottom: 1px solid #0099ff;
}
</style>
