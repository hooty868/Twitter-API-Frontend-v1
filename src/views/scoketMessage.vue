<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar :navbar-status="status" />
      </div>
      <div class="main-group col-3 h-100">
        <div class="header">
          <p>上線使用者({{ onlinePeople }})</p>
        </div>
        <div class="group-usercards">
          <div class="user-card d-flex" v-for="mes in userOn" :key="mes.id">
            <img :src="mes.avatar" alt="avater" />
            <div class="user-content d-flex">
              <p class="user-name">{{ mes.name }}</p>
              <p class="user-account">@{{ mes.account }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-conversation col h-100">
        <div class="header"><p>公開聊天室</p></div>
        <div class="main-content mt-2" id="main-content">
          <!-- 歷史訊息 -->
          <div v-for="mes in messagesHistory" :key="mes.id">
            <div
              v-if="mes.User.id !== user.id"
              class="conversation-content js-start"
            >
              <img :src="mes.User.avatar" alt="avatar" />
              <div class="content-description">
                <p class="description-text bg-grey">
                  {{ mes.content }}
                </p>
                <p class="description-time">{{ mes.time }}</p>
              </div>
            </div>
            <div v-else class="conversation-content js-end">
              <!-- <img :src="mes.User.avatar" alt="avatar" /> -->
              <div class="content-description">
                <p class="description-text bg-orange">
                  {{ mes.content }}
                </p>
                <p class="description-time">{{ mes.time }}</p>
              </div>
            </div>
          </div>
          <!-- 上線訊息 -->
          <div class="user-online">
            <p v-for="off in offline" :key="off.id">{{ off }}</p>
          </div>
          <!-- 即時訊息 -->
          <div v-for="mes in messages" :key="mes.id">
            <!-- 他人發言 -->
            <div
              v-if="mes.User.id !== user.id"
              class="conversation-content js-start"
            >
              <img :src="mes.User.avatar" alt="avatar" />
              <div class="content-description">
                <p class="description-text bg-grey">
                  {{ mes.content }}
                </p>
                <p class="description-time">{{ mes.time }}</p>
              </div>
            </div>
            <!-- 自己發言 -->
            <div v-else class="conversation-content js-end">
              <!-- <img :src="mes.User.avatar" alt="avatar" /> -->
              <div class="content-description">
                <p class="description-text bg-orange">
                  {{ mes.content }}
                </p>
                <p class="description-time">{{ mes.time }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <input
            v-on:keyup.enter="submit"
            v-model="user.message"
            id="message"
            type="text"
            name="message"
            autocomplete="message"
            placeholder="輸入訊息..."
            required
          />
          <img
            @click="submit"
            src="https://upload.cc/i1/2020/12/26/G6Kzb9.png"
            alt="output"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import { mapState } from "vuex";
import { io } from "socket.io-client";
import io from "socket.io-client";
const newtoken = localStorage.getItem("token");

const socket = io("https://socket-go.herokuapp.com/", {
  query: {
    token: newtoken,
  },
});

export default {
  components: {
    // Spinner,
    Navbar,
    // Followers,
    // twitterList,
  },
  data() {
    return {
      // 上線訊息
      online: "",
      // 下線訊息
      offline: [],
      messages: [],
      //放上線的人
      userOn: [],
      //放歷史訊息
      messagesHistory: [],
      messagesHistorySelf: [],
      messagesHistoryOther: [],
      onlinePeople: "",
      socket: {},
      user: {
        message: "",
        name: "",
        id: -1,
      },
      status: "status1",
      account: "",
      token: "",
    };
  },

  created() {
    this.socket = socket;
    this.socket.emit("joinRoom");
    this.fetchUser();
  },

  mounted() {
    this.socket.on("loadMessages", (historyMessages) => {
      historyMessages.map((mes) => {
        if (mes.User.id === this.currentUser.id) {
          this.messagesHistorySelf.push(mes);
        } else {
          this.messagesHistoryOther.push(mes);
        }
      });
      this.messagesHistory = historyMessages;
    });

    this.socket.on("currentUsers", (data) => {
      this.userOn = data.userList;
      this.onlinePeople = data.usersCount;
    });

    this.socket.on("userJoin", (msg) => {
      this.offline.push(msg);
    });

    this.socket.on("serverMessage", (serverMessage) => {
      this.messages.push(serverMessage);
    });
    this.socket.on("userLeave", (leaveMes) => {
      this.offline.push(leaveMes);
    });
    this.scrollToEnd();
  },
  updated() {
    this.scrollToEnd();
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },

  methods: {
    submit() {
      this.socket.emit("userMessage", this.user.message);
      this.user.message = "";
    },
    fetchUser() {
      this.user.name = this.currentUser.name;
      this.account = this.currentUser.name;
      this.user.id = this.currentUser.id;
    },
    scrollToEnd() {
      var mainContent = this.$el.querySelector("#main-content");
      mainContent.scrollTop = mainContent.scrollHeight;
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto 0 auto;
  max-height: 800px;
}
.setting-pannel {
  width: auto;
}

/* 上線使用者 */
.main-group {
  width: 350px;
  padding: 0;
  border-left: 1px #e6ecf0 solid;
  border-right: 1px #e6ecf0 solid;
}
.main-group .header {
  width: 100%;
  height: 55px;
  border-bottom: 1px #e6ecf0 solid;
}
.main-group .header p {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
  color: #1c1c1c;
  padding-top: 15px;
  padding-left: 15px;
}
.group-usercards {
  max-height: 1145px;
}
.user-card {
  height: 70px;
  border-bottom: 1px #e6ecf0 solid;
  align-items: center;
}
.user-card img {
  margin-left: 8px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.user-card .user-content {
  height: 22px;
  width: 250px;
}
.user-card .user-content p {
  margin: 0 0 0 6px;
  width: auto;
  line-height: 22px;
}
.user-card .user-content .user-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}
.user-card .user-content .user-account {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

/* 聊天室 */
.main-conversation {
  width: 1200px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px #e6ecf0 solid;
  min-height: 0px;
}
.main-conversation .header {
  width: 100%;
  height: 55px;
  border-bottom: 1px #e6ecf0 solid;
}
.main-conversation .header p {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
  color: #1c1c1c;
  padding-top: 15px;
  padding-left: 15px;
}
.main-conversation .main-content {
  width: 100%;
  height: 1100px;
  overflow-y: scroll;
}

.user-online {
  align-content: center;
  justify-content: center;
}
.user-online p {
  width: 20%;
  height: 30px;
  background: #ebf0f3;
  margin: 5px auto 10px auto;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
}
.js-start {
  align-content: center;
  justify-content: flex-start;
  padding-left: 30px;
}
.js-end {
  align-content: center;
  justify-content: flex-end;
  padding-right: 30px;
}
.conversation-content {
  width: 100%;
  height: auto;
  display: flex;
}
.conversation-content img {
  height: 50px;
  width: 50px;
  margin-right: 20px;
  border-radius: 50%;
}
.conversation-content p {
  margin: 0;
}
.bg-orange {
  background: #ff6600;
  color: white;
}
.bg-grey {
  background: #ebf0f3;
}
.description-text {
  margin: 0;
  width: 300px;
  border-radius: 20px;
  padding: 5px 10px 5px 10px;
}
.content-description .description-time {
  margin: 0 0 0 10px;
}
.main-conversation .footer {
  display: flex;
  width: 100%;
  height: 40px;
}
.main-conversation .footer input {
  width: 80%;
  height: 30px;
  margin: 0 5% 0 5%;
  border-radius: 15px;
  border: none;
  background: #ebf0f3;
  padding: 0;
  padding-left: 5%;
}
.main-conversation .footer img {
  width: 30px;
  height: 30px;
}
</style>
