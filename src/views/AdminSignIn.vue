// ./src/views/SignIn.vue
<template>
  <div class="container py-5 w-100">
    <form class="w-100">
      <img alt="logo" src="" />

      <div class="mb-4">
        <h1 class="h3 mb-3 font-weight-normal">後台登入</h1>
      </div>

      <div class="form-label-group mb-2">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="帳號"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="密碼"
          autocomplete="current-password"
          required
        />
      </div>

      <button class="mb-3" type="submit">登入</button>
    </form>
    <div class="link">
      <a href="#">前台登入</a>
    </div>
  </div>
</template>

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
  border-bottom: 1px solid #657786;
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
</style>