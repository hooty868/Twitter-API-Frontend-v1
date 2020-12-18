<template>
  <div id="main-app">
    <nav class="d-flex flex-column justify-content-between align-items-center">
      <div class="top-items">
        <div class="logo-container">
          <img class="logo" src="/image/Logo.png" alt="Logo" />
        </div>
        <div class="pannel-icon-container chosen d-flex">
          <img
            class="pannel-icon"
            src="/image/icon_index_orange.png"
            alt="Index"
          />
          <h1 class="pannel-icon-text chosen">推文清單</h1>
        </div>
        <div class="pannel-icon-container d-flex">
          <img
            class="pannel-icon"
            src="/image/icon_profile.png"
            alt="Profile"
          />
          <h1 class="pannel-icon-text">使用者列表</h1>
        </div>
      </div>
      <div>
        <div class="d-flex align-items-center">
          <img class="pannel-icon m-3" src="/image/logout@2x.png" alt="Index" />
          <a href="#" class="text-center text-dark">登出</a>
        </div>
      </div>
    </nav>
    <main id="main-content">
      <div class="title">
        <h4>推文清單</h4>
      </div>
      <div class="card-wrapper">
        <div class="card" v-for="tweet in tweets" :key="tweet.id">
          <div class="user-avatar">
            <img class="user-avatar" :src="tweet.User.cover" alt="" />
          </div>
          <div class="content">
            <div class="detail">
              <div class="name mr-1">{{ tweet.User.name }}</div>
              <div class="account mr-1">{{ tweet.User.account }}</div>
              <div class="creat-time">{{ tweet.createdAt }}</div>
            </div>
            <div class="tweet">
              {{ tweet.description }}
            </div>
          </div>

          <div class="tweet-delete">x</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const dummyData = [
  // 第一則推文
  {
    id: 1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    createdAt: "1小時",
    updatedAt: "...",
    isLiked: true,
    UserId: 1,
    User: {
      id: 1,
      name: "Apple",
      cover:
        "https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
      account: "@apple",
    },
    likedCount: 100,
    repliedCount: 100,
  },
  {
    id: 2,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    createdAt: "3小時",
    updatedAt: "...",
    isLiked: true,
    UserId: 1,
    User: {
      id: 1,
      name: "Apple",
      cover:
        "https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
      account: "@apple",
    },
    likedCount: 100,
    repliedCount: 100,
  },
  {
    id: 3,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    createdAt: "3小時",
    updatedAt: "...",
    isLiked: true,
    UserId: 1,
    User: {
      id: 1,
      name: "Apple",
      cover:
        "https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
      account: "@apple",
    },
    likedCount: 100,
    repliedCount: 100,
  },
  {
    id: 4,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    createdAt: "5小時",
    updatedAt: "...",
    isLiked: true,
    UserId: 1,
    User: {
      id: 1,
      name: "Apple",
      cover:
        "https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
      account: "@apple",
    },
    likedCount: 100,
    repliedCount: 100,
  },
];
export default {
  data() {
    return {
      tweets: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.tweets = dummyData;
    },
  },
};
</script>

<style scoped>
/* left side */
nav {
  width: 380px;
  position: fixed;
  top: 0;
  bottom: 0;
  padding: 16px 0;
  z-index: 100;
  border: 1px solid #e6ecf0;
  background: #ffffff;
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
  cursor: pointer;
}
.pannel-icon-container .chosen {
  color: #ff6600;
}

/* right side */

#main-app {
  height: 100%;
}

#main-content {
  margin-left: 380px;
}

.title {
  position: fixed;
  top: 0%;
  border: 1px solid #e6ecf0;
  height: 55px;
  width: 100%;
  padding-left: 2rem;
}
.title h4 {
  line-height: 55px;
  color: black;
  font-weight: bold;
}

.card {
  border: 1px solid #e6ecf0;
  width: 100%;
  height: 124px;
  display: flex;
  flex-direction: row;
  position: relative;
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 1rem;
}

.content {
  margin-left: 2rem;
}

.detail {
  display: flex;
}
.detail .name {
  font-weight: bold;
  font-size: 16px;
}

.tweet {
  width: 100%;
}

.tweet-delete {
  position: absolute;
  color: #657786;
  font-size: 2rem;
  right: 1rem;
  top: 0.5rem;
  cursor: pointer;
}
.tweet-delete:hover {
  color: black;
}
</style>