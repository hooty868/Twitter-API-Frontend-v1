<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar />
      </div>
      <div class="main-content col h-100">
        <div class="header pl-3">
          <img src="/image/arrow.png" alt="" />
          <div class="header-content">
            <p class="name">John Doe</p>
            <p class="twitter">25推文</p>
          </div>
        </div>
        <div class="user-info">
          <div class="background">
            <img
              src="https://images.unsplash.com/photo-1535294435445-d7249524ef2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
              alt=""
            />
            <div class="avatar">
              <img
                src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
                alt=""
              />
            </div>
          </div>
          <div class="user">
            <div class="detail">
              <p class="name">John Doe</p>
              <p class="account">@heyjohn</p>
              <p class="intro">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint.
              </p>
              <div class="follow-detail">
                <p>34個 <span>追隨中</span></p>
                <p>59位 <span>追隨者</span></p>
                <div />
                <button class="btn edit">編輯個人資料</button>
              </div>
            </div>
          </div>
        </div>
        <div class="user-tweet">
          <div class="content-control d-flex">
            <div
              class="tweets content"
              v-bind:class="{ active: showContent.tweets }"
              v-on:click="showTweets()"
            >
              推文
            </div>
            <div
              class="response content"
              v-bind:class="{ active: showContent.reply }"
              v-on:click="showReply()"
            >
              推文與回覆
            </div>
            <div
              class="liked content"
              v-bind:class="{ active: showContent.like }"
              v-on:click="showLike()"
            >
              喜歡的內容
            </div>
          </div>
          <div class="content-render">
            <div class="card" v-if="showContent.tweets">
              <div class="user-avatar">
                <img
                  class="user-avatar"
                  src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
                  alt=""
                />
              </div>
              <div class="content">
                <div class="detail">
                  <div class="name mr-1">John Doe</div>
                  <div class="account mr-1">@heyjohn ・</div>
                  <div class="creat-time">3 小時</div>
                </div>
                <div class="tweet">
                  Je guide mon ami @Karnagemvp dans cette belle division qu'est
                  le GOLD
                </div>
                <div class="follow-content">
                  <div class="response">
                    <img src="/image/reply_icon.png" alt="" />13
                  </div>
                  <div class="like">
                    <img src="/image/like_icon.png" alt="" />76
                  </div>
                </div>
              </div>
            </div>
            <div class="card" v-if="showContent.like">
              <div class="user-avatar">
                <img
                  class="user-avatar"
                  src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
                  alt=""
                />
              </div>
              <div class="content">
                <div class="detail">
                  <div class="name mr-1">Devon Lane</div>
                  <div class="account mr-1">@DL・</div>
                  <div class="creat-time">3 小時</div>
                </div>
                <div class="tweet">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </div>
                <div class="follow-content">
                  <div class="response">
                    <img src="/image/reply_icon.png" alt="" />13
                  </div>
                  <div class="like">
                    <img src="/image/liked.png" alt="" />76
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-follower col-4 h-100"></div>
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
      showContent: {
        tweets: true,
        reply: false,
        like: false,
      },
    };
  },
  methods: {
    showTweets() {
      this.showContent.tweets = true;
      this.showContent.reply = false;
      this.showContent.like = false;
    },
    showReply() {
      this.showContent.tweets = false;
      this.showContent.reply = true;
      this.showContent.like = false;
    },
    showLike() {
      this.showContent.tweets = false;
      this.showContent.reply = false;
      this.showContent.like = true;
    },
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
  border: 1px #e6ecf0 solid;
}
.main-content .header {
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
}

.main-content .header img:hover {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.header-content {
  margin-left: 2rem;
}
.header-content .name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: -0.3rem;
}
.header-content .twitter {
  font-size: 0.5rem;
  margin-bottom: -0.3rem;
  color: #657786;
}

.user-info {
  width: 100%;
}

.user-info .background,
.background img {
  width: 100%;
  height: 200px;
}

.user-info .background {
  position: relative;
}

.user-info .avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -70px;
  left: 14px;
}

.user-info .avatar img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
}

.user {
  padding-top: 70px;
  padding-left: 15px;
  position: relative;
}

.user .name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: -0.3rem;
}

.user .account {
  color: #657786;
}

.detail .follow-detail {
  display: flex;
}
.follow-detail p {
  font-weight: bold;
  margin-right: 20px;
}

.follow-detail span {
  color: #657786;
}

.detail button {
  width: 122px;
  height: 40px;
  border: 1px solid #ff6600;
  color: #ff6600;
  font-weight: bold;
  border-radius: 100px;
  position: absolute;
  right: 15px;
  top: 10px;
}

.user-tweet {
  width: 100%;
  height: 50px;
  margin-top: 30px;
}
.content-control {
  height: 50px;
}

.content-control .content {
  width: 130px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  color: #657786;
  font-size: 16px;
  cursor: pointer;
}

.content-control .active {
  color: #ff6600;
  border-bottom: 2px solid #ff6600;
}

.card {
  border: 1px solid #e6ecf0;
  width: 100%;
  min-height: 144px;
  display: flex;
  flex-direction: row;
  padding: 15px 0 0 13px;
}

.card .user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #c4c4c4;
  margin-right: 10px;
}

.card .detail {
  display: flex;
}

.card .detail .name {
  font-weight: bold;
}

.card .tweet {
  margin: 6px 15px 14px 0;
}

.card .detail .account,
.creat-time,
.follow-content .response,
.follow-content .like {
  color: #657786;
}

.follow-content {
  display: flex;
  margin-bottom: 14px;
}
.content .follow-content img {
  width: 14px;
  height: 14px;
  margin-right: 11px;
}

.content .follow-content .response {
  margin-right: 50px;
}
</style>