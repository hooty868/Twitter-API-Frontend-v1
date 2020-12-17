<template>
  <div id="main-app">
    <nav class="d-flex flex-column justify-content-between align-items-center">
      <div class="top-items">
        <img class="logo" src="../assets/logo.png" />
        <a href="#" class="text-center">推文清單</a>
        <a href="#" class="text-center">使用者列表</a>
      </div>
      <div>
        <a href="#" class="text-center">登出</a>
      </div>
    </nav>
    <main id="main-content">
      <div class="title">
        <h4>使用者列表</h4>
      </div>
      <div class="card-list-panel">
        <div class="user-list">
          <div class="card">
            <div class="user-cover">
              <img
                src="https://images.unsplash.com/photo-1535294435445-d7249524ef2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                class="user-cover"
              />
            </div>
            <div class="avatar">
              <img
                class="user-avatar"
                src="https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
                alt=""
              />
            </div>
            <div class="user-info">
              <p class="name">John Doe</p>
              <p class="account">@heyjohn</p>
              <div class="user-detail">
                <p>1.5k</p>
                <p>20k</p>
              </div>
              <div class="user-detail">
                <p>34個 <span>跟隨中</span></p>
                <p>59位 <span>跟隨者</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
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

.card-list-panel {
  background-color: white;
  display: flex;
  justify-content: center;
}

.user-list {
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  padding-left: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.card {
  max-width: 245px;
  min-width: 245px;
  height: 314px;
  text-align: center;
  border-radius: 10px 10px 10px 10px;
  background: #f6f7f8;
  position: relative;
  border: none;
  margin-bottom: 1rem;
}

.user-cover {
  width: 245px;
  border-radius: 10px 10px 0px 0px;
  height: 140px;
  background: #c4c4c4;
}

.avatar {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  position: absolute;
  z-index: 20;
  top: 23%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar .user-avatar {
  width: 93px;
  height: 93px;
  border-radius: 50%;
}

.user-info {
  margin-top: 2.5rem;
}

.user-detail {
  display: flex;
  justify-content: center;
}

.user-info p {
  margin: 0.15rem;
  font-size: 16px;
}
.user-info .name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: -0.3rem;
}

.account,
span {
  color: #657786;
}
</style>