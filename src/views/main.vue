<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar />
      </div>
      <div class="main-content col h-100">
        <div class="header"><p>首頁</p></div>
        <div class="twitter-bar d-flex">
          <img class="profile-avater" src="/image/Photo.png" alt="avater" />
          <form class="form-group">
            <input
              id="twitter"
              v-model="twitter"
              name="twitter"
              type="twitter"
              class="twitter-input form-control"
              autocomplete="twitter"
              placeholder="有什麼新鮮事？"
              required
              autofocus
            />
          </form>
          <button class="btn btn-lg btn-submit btn-block mb-3" type="submit">
            推文
          </button>
        </div>
        <div class="twitter-cards w-100">
          <div class="comments-card w-100 d-flex">
            <img class="card-avater" src="/image/Photo.png" alt="avater" />
            <div class="card-content flex-grow-1">
              <div class="content-title d-flex">
                <p class="user-name">Apple</p>
                <p class="user-account">@apple ·</p>
                <p class="comment-date">3小時</p>
              </div>
              <div class="content-description">
                <p class="content-text w-100">
                  Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                  ullamco cillum dolor. Voluptate exercitation incididunt
                  aliquip deserunt reprehenderit elit laborum.
                </p>
                <div class="button-pannel d-flex">
                  <div class="reply-button d-flex">
                    <img
                      class="icon-img"
                      src="/image/reply_icon.png"
                      alt="icon"
                    />
                    <p class="reply-count">13</p>
                  </div>
                  <div class="like-button d-flex">
                    <img
                      class="icon-img"
                      src="/image/like_icon.png"
                      alt="icon"
                    />
                    <p class="like-count">46</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="comments-card w-100 d-flex">
            <img class="card-avater" src="/image/Photo.png" alt="avater" />
            <div class="card-content flex-grow-1">
              <div class="content-title d-flex">
                <p class="user-name">Apple</p>
                <p class="user-account">@apple ·</p>
                <p class="comment-date">3小時</p>
              </div>
              <div class="content-description">
                <p class="content-text w-100">
                  Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                  ullamco cillum dolor. Voluptate exercitation incididunt
                  aliquip deserunt reprehenderit elit laborum.
                </p>
                <div class="button-pannel d-flex">
                  <div class="reply-button d-flex">
                    <img
                      class="icon-img"
                      src="/image/reply_icon.png"
                      alt="icon"
                    />
                    <p class="reply-count">13</p>
                  </div>
                  <div class="like-button d-flex">
                    <img
                      class="icon-img"
                      src="/image/like_icon.png"
                      alt="icon"
                    />
                    <p class="like-count">46</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-follower col-4 h-100">
        <Followers />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import Followers from "./../components/followers";
export default {
  components: {
    Navbar,
    Followers,
  },
  data() {
    return {
      twitter: "",
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1440px;
  height: 1200px;
  margin: 0 auto 0 auto;
}
.navbar {
  margin: 0 25px auto auto;
}
.main-content {
  width: 600px;
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
.twitter-bar {
  height: 120px;
  border-bottom: 10px #e6ecf0 solid;
  position: relative;
}
.profile-avater {
  width: 50px;
  height: 50px;
  margin: 10px auto auto 15px;
}
.form-group {
  margin: 0;
  width: 510px;
  height: 26px;
  margin: 21px auto auto 10px;
}
.twitter-input {
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  padding: 0;
}
.btn-submit {
  width: 64px;
  height: 40px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 60px;
  right: 15px;
}
.twitter-cards {
  height: calc(100%-175px);
}
.comments-card {
  border-bottom: 1px #e6ecf0 solid;
}
.card-avater {
  width: 50px;
  height: 50px;
  margin: 13px 10px auto 15px;
}
.content-title {
  width: 160px;
  height: 22px;
}
.content-title p {
  margin: 10px 5px 6px 0;
}
.user-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}
.user-account {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}
.comment-date {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}
.content-description {
  width: 510px;
  height: 107px;
}
.content-description p {
  margin: 10px auto 14.4px 0;
}
.icon-img {
  width: 12.34px;
  height: 12.34px;
  margin: 0 11.35px 0 0;
}
.content-description .reply-count {
  margin: 0 51px 0 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #657786;
}
.content-description .like-count {
  margin: 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #657786;
}
</style>