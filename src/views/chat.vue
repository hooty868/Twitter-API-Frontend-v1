<template>
  <div class="container">
    <div class="row h-100">
      <div class="setting-pannel col-3 h-100">
        <Navbar />
      </div>
      <div class="users-content col-3 h-100">
        <div class="header pl-3">
          <div class="header-content">
            <p class="title">上線使用者(5)</p>
          </div>
        </div>

        <div class="user-list">
          <div class="card-wrapper">
            <div class="card">
              <div class="user-avatar">
                <img alt="" />
              </div>
              <div class="detail">
                <div class="name mr-1">Apple</div>
                <div class="account mr-1">@Apple</div>
              </div>
            </div>
            <div class="card" v-for="user in userOn" :key="user.id">
              <div class="user-avatar">
                <img alt="" />
              </div>
              <div class="detail">
                <div class="name mr-1">{{ user }}</div>
                <div class="account mr-1">@Apple</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chatroom-content col h-100">
        <div class="header pl-3">
          <div class="header-content">
            <p class="title">公開聊天室</p>
          </div>
        </div>

        <div class="chatroom">
          <div class="content-render">
            <div id="messages">
              <div
                class="message-text"
                v-for="mes in messageSelf"
                :key="mes.id"
              >
                {{ mes }}
              </div>
            </div>
            <div id="messages-other">
              <div
                class="message-text"
                v-for="mes in messageOther"
                :key="mes.id"
              >
                {{ mes }}
              </div>
            </div>
            <div class="greeting">
              <div id="greeting" v-for="greet in greeting" :key="greet.id">
                <div class="greeting-text">{{ greet }}</div>
              </div>
            </div>
          </div>
          <div class="message-control">
            <form>
              <input id="m" autocomplete="off" v-model="user.message" /><button
                @click.prevent.stop="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import { mapState } from "vuex";
import io from "socket.io-client";
export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  data() {
    return {
      //放上線下線提示
      greeting: [],
      //放自己的發言
      messageSelf: [],
      //放其他人的發言
      messageOther: [],
      //放上線的人
      userOn: [],
      //放歷史訊息
      messagesHistory: [],
      socket: {},
      messages: [],
      user: {
        message: "",
        name: "",
        id: -1,
      },
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
    this.fetchUser();
  },
  mounted() {
    this.socket.emit("user-join", this.currentUser);

    this.socket.on("user-joined", (msg) => {
      console.log(msg);
      this.userOn.push(msg);
      this.greeting.push(`${msg} 上線了`);
    });
    this.socket.on("newMessage", (obj) => {
      if (obj.id === this.currentUser.id) {
        this.messageSelf.push(obj.message);
      } else {
        this.messageOther.push(obj.message);
      }
    });
  },

  methods: {
    fetchUser() {
      this.user.name = this.currentUser.name;
      this.user.id = this.currentUser.id;
    },
    submit() {
      this.socket.emit("sendMessage", this.user);
      this.user.message = "";
    },
  },
};
</script>

 <style>
.container {
  max-width: 1440px;
  height: 1200px;
  margin: 0 auto 0 auto;
}
.users-content,
.chatroom-content {
  width: 100%;
  padding: 0;
  border: 1px #e6ecf0 solid;
}
.users-content .header,
.chatroom-content .header {
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
}

.header-content {
  margin-left: 2rem;
}
.header-content .title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: -0.3rem;
}

/* user list */

.users-content .card {
  border: 1px solid #e6ecf0;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
}

.users-content .user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: grey;
}

.users-content .detail {
  display: flex;
}
.users-content .detail .name {
  font-weight: bold;
  font-size: 16px;
}

/* chatroom */

.chatroom-content {
  width: 100%;
  border: 1px solid #e6ecf0;
}

.chatroom-content .chatroom .content-render {
  width: 100%;
  height: 500px;
  border: 1px solid red;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
}

.chatroom-content .chatroom .message-control {
  width: 100%;
  border: 1px #e6ecf0 solid;
}

.chatroom-content .chatroom .message-control form {
  width: 100%;
  border: 1px #e6ecf0 solid;
}

.chatroom-content .chatroom .message-control input {
  width: 80%;
  border: 1px #e6ecf0 solid;
}

.chatroom-content .chatroom .message-control button {
  width: 20%;
  border: 1px #e6ecf0 solid;
}

/* chatroom content-render */
#messages {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}
#messages-other {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#messages .message-text {
  padding: 5px 10px;
  border: 1px red solid;
  text-align: end;
}

#messages-other .message-text {
  padding: 5px 10px;
  border: 1px red solid;
  text-align: start;
}

#greeting {
  list-style-type: none;
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column-reverse;
}
#greeting .greeting-text {
  width: auto;
  background: #cccccc;
  border-radius: 100px;
  display: inline;
  padding: 5px 10px;
  margin-bottom: 5px;
}
</style>
