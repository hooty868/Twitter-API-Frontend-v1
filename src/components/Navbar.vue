<template>
  <nav class="navbar d-flex flex-column justify-content-between">
    <div class="pannel-container">
      <div class="logo-container">
        <img class="logo" src="/image/Logo.png" alt="Logo" />
      </div>
      <div class="pannel-icon-container d-flex">
        <img class="pannel-icon" src="/image/icon_index.png" alt="Index" />
        <h1 class="pannel-icon-text">首頁</h1>
      </div>
      <div class="pannel-icon-container d-flex">
        <img class="pannel-icon" src="/image/icon_profile.png" alt="Profile" />
        <h1 class="pannel-icon-text">個人資料</h1>
      </div>
      <div class="pannel-icon-container d-flex">
        <img class="pannel-icon" src="/image/icon_setting.png" alt="Setting" />
        <h1 class="pannel-icon-text setting">設定</h1>
      </div>
      <button class="btn btn-lg btn-submit btn-block mb-3" type="submit">
        推文
      </button>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
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
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="logOut-contaier">
      <div class="pannel-icon-container d-flex">
        <img class="pannel-icon" src="/image/icon_logout.png" alt="Setting" />
        <h1 class="pannel-icon-text">登出</h1>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped>
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
.setting {
  color: #ff6600;
}
.btn-submit {
  height: 45px;
  width: 210px;
  margin-top: 20px;
}
.logOut-contaier {
  width: 100%;
}
</style>