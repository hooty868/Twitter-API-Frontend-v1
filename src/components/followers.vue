<template>
  <div class="followers-container">
    <div class="header w-100"><p>首頁</p></div>
    <div class="follower-cards w-100">
      <div class="follower-card w-100 d-flex">
        <img class="profile-avater" src="/image/Photo.png" alt="avater" />
        <div class="card-content">
          <p class="card-name">Pizza Hut</p>
          <p class="card-account">@pizzahut</p>
        </div>
        <button
          class="btn btn-lg btn-submit isfollowered btn-block mb-3"
          type="submit"
        >
          正在跟隨
        </button>
        <button
          class="btn btn-lg btn-submit nonfollowered btn-block mb-3"
          type="submit"
        >
          跟隨
        </button>
      </div>
      <div class="follower-card w-100 d-flex">
        <img class="profile-avater" src="/image/Photo.png" alt="avater" />
        <div class="card-content">
          <p class="card-name">Pizza Hut</p>
          <p class="card-account">@pizzahut</p>
        </div>
        <button
          class="btn btn-lg btn-submit isfollowered btn-block mb-3"
          type="submit"
        >
          正在跟隨
        </button>
        <button
          class="btn btn-lg btn-submit nonfollowered btn-block mb-3"
          type="submit"
        >
          跟隨
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.followers-container {
  width: 350px;
  height: 517px;
  background: #f5f8fa;
  border-radius: 14px;
  margin: 15px auto auto 15px;
}
.header {
  height: 45px;
  border-bottom: 1px #e6ecf0 solid;
}
.header p {
  width: 54px;
  height: 26px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #1c1c1c;
  margin: 0px auto auto 15px;
  padding-top: 10px;
}
.follower-card {
  background: none;
  border: none;
  height: 70px;
  border-bottom: 1px #e6ecf0 solid;
}
.profile-avater {
  width: 50px;
  height: 50px;
  margin: auto 10px auto 15px;
}
.card-content {
  width: 79px;
  height: 33px;
  margin: auto 0 auto 0;
}
.card-name {
  margin: 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #1c1c1c;
}
.card-account {
  margin: 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}
.isfollowered {
  width: 92px;
  height: 30px;
  padding: 0;
  margin: auto 15px auto auto;
  font-size: 15px;
  line-height: 15px;
}
.nonfollowered {
  width: 62px;
  height: 30px;
  background: none;
  border: 1px solid #ff6600;
  color: #ff6600;
  padding: 0;
  margin: auto 15px auto auto;
}
</style>