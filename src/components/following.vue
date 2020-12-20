<template>
  <div>
    <div class="card" v-for="follower in followers" :key="follower.id">
      <div class="user-avatar">
        <img class="avatar" :src="follower.avatar" alt="" />
      </div>
      <div class="content">
        <div class="detail">
          <div class="name mr-1">{{ follower.name }}</div>
          <div class="account mr-1">@{{ follower.account }}</div>
          <div class="tweet">
            {{ follower.introduction }}
          </div>
        </div>
      </div>
      <button v-if="follower.isFollowed" class="follower-btn">正在跟隨</button>
      <button v-else class="follow-btn">追隨</button>
    </div>
  </div>
</template>

<script>
const dummyData = [
  {
    followerId: 2,
    name: "user1",
    account: "user1",
    avatar: "https://loremflickr.com/320/240/corgi?lock=40",
    introduction: "Et id quae sed.",
    isFollowed: 1,
  },
  {
    followerId: 3,
    name: "test!",
    account: "user2",
    avatar: "https://loremflickr.com/320/240/corgi?lock=38.779509448635196",
    introduction: "test intro111",
    isFollowed: 1,
  },
];
export default {
  data() {
    return {
      followers: [],
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.followers = dummyData;
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #e6ecf0;
  width: 100%;
  min-height: 103px;
  display: flex;
  flex-direction: row;
  padding: 15px 0 0 13px;
  position: relative;
}

.card .user-avatar,
.card .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #c4c4c4;
  margin-right: 10px;
}
.card .user-avatar {
  margin-top: 13px;
}

.card .follower-btn {
  width: 92px;
  height: 30px;
  border: 1px solid #ff6600;
  background: #ff6600;
  color: #fff;
  border-radius: 100px;
  position: absolute;
  right: 15px;
  top: 11px;
}

.card .follow-btn {
  width: 62px;
  height: 30px;
  border: 1px solid #ff6600;
  background: white;
  color: #ff6600;
  border-radius: 100px;
  position: absolute;
  right: 15px;
  top: 11px;
}

.card .detail .name {
  font-weight: bold;
}
.card .detail .account {
  color: #657786;
  margin-top: -2px;
}
.card .detail .tweet {
  margin-top: -2px;
}

.card .tweet {
  margin: 6px 15px 14px 0;
}
</style>