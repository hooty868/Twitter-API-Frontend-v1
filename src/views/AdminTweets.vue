<template>
  <div id="main-app">
    <nav class="d-flex flex-column justify-content-between align-items-center">
      <div class="top-items">
        <img class="logo" src="/image/Logo.png" />
        <a href="#" class="text-center">推文清單</a>
        <a href="#" class="text-center">使用者列表</a>
      </div>
      <div>
        <a href="#" class="text-center">登出</a>
      </div>
    </nav>
    <main id="main-content">
      <div class="title">
        <h4>推文清單</h4>
      </div>
      <div class="card-wrapper">
        <div class="card">
          <div class="user-avatar">
            <img
              class="user-avatar"
              src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
              alt=""
            />
          </div>
          <div class="content">
            <div class="detail">
              <div class="name mr-1">Apple</div>
              <div class="account mr-1">@apple</div>
              <div class="creat-time">3小時</div>
            </div>
            <div class="tweet">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
          </div>

          <div class="tweet-delete">x</div>
        </div>
        <div class="card">
          <div class="user-avatar">
            <img
              class="user-avatar"
              src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
              alt=""
            />
          </div>
          <div class="content">
            <div class="detail">
              <div class="name mr-1">Apple</div>
              <div class="account mr-1">@apple</div>
              <div class="creat-time">3小時</div>
            </div>
            <div class="tweet">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
          </div>

          <div class="tweet-delete">x</div>
        </div>
        <div class="card">
          <div class="user-avatar">
            <img
              class="user-avatar"
              src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
              alt=""
            />
          </div>
          <div class="content">
            <div class="detail">
              <div class="name mr-1">Apple</div>
              <div class="account mr-1">@apple</div>
              <div class="creat-time">3小時</div>
            </div>
            <div class="tweet">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
          </div>

          <div class="tweet-delete">x</div>
        </div>
        <div class="card">
          <div class="user-avatar">
            <img
              class="user-avatar"
              src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
              alt=""
            />
          </div>
          <div class="content">
            <div class="detail">
              <div class="name mr-1">Apple</div>
              <div class="account mr-1">@apple</div>
              <div class="creat-time">3小時</div>
            </div>
            <div class="tweet">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
          </div>

          <div class="tweet-delete">x</div>
        </div>
        <div class="card">
          <div class="user-avatar">
            <img
              class="user-avatar"
              src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
              alt=""
            />
          </div>
          <div class="content">
            <div class="detail">
              <div class="name mr-1">Apple</div>
              <div class="account mr-1">@apple</div>
              <div class="creat-time">3小時</div>
            </div>
            <div class="tweet">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
          </div>

          <div class="tweet-delete">x</div>
        </div>
        <div class="card">
          <div class="user-avatar">
            <img
              class="user-avatar"
              src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
              alt=""
            />
          </div>
          <div class="content">
            <div class="detail">
              <div class="name mr-1">Apple</div>
              <div class="account mr-1">@apple</div>
              <div class="creat-time">3小時</div>
            </div>
            <div class="tweet">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
          </div>

          <div class="tweet-delete">x</div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* style start */

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
nav .logo {
  width: 50px;
  height: 50px;
  margin-bottom: 2rem;
}
nav a {
  margin-bottom: 3rem;
  font-size: 1.3rem;
  color: black;
}

.top-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

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