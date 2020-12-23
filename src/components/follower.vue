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
      <button
        v-if="follower.isFollowed"
        class="follower-btn"
        @click.stop.prevent="deleteFollowing(follower.followerId)"
      >
        正在跟隨
      </button>
      <button
        v-else
        @click.stop.prevent="addFollowing(follower.followerId)"
        class="follow-btn"
      >
        追隨
      </button>
    </div>
  </div>
</template>

<script>
import userAPI from "../apis/user";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  data() {
    return {
      followers: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const { data } = await userAPI.getFollower(this.currentUser.id);
        this.followers = data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
    async deleteFollowing(followerId) {
      try {
        const { data } = await userAPI.deleteFollowing(followerId);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.followers = this.followers.map((follower) => {
          if (follower.followerId !== followerId) {
            return follower;
          } else {
            return {
              ...follower,
              isFollowed: 0,
            };
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
    async addFollowing(followerId) {
      try {
        const { data } = await userAPI.addFollowing(followerId);
        console.log(followerId);
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.followers = this.followers.map((follower) => {
          if (follower.followerId !== followerId) {
            return follower;
          } else {
            return {
              ...follower,
              isFollowed: 1,
            };
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試",
        });
      }
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
  outline: none;
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
  outline: none;
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