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
            <img class="user-avatar" :src="tweet.User.avatar" alt="" />
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

          <div
            class="tweet-delete"
            @click.stop.prevent="deleteTweets(tweet.id)"
          >
            x
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import adminAPI from "../apis/admin";
// import { Toast } from "./../utils/helpers";

const dummyData = [
  {
    id: 1,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 261,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 11,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 271,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 21,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 281,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 2,
    repliedCount: 3,
  },
  {
    id: 31,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 1,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 291,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 1,
    likedCount: 2,
    repliedCount: 3,
  },
  {
    id: 41,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 301,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 1,
    likedCount: 3,
    repliedCount: 3,
  },
  {
    id: 51,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 311,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 61,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 2,
    repliedCount: 3,
  },
  {
    id: 321,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 2,
    repliedCount: 3,
  },
  {
    id: 71,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 331,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 81,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 341,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 91,
    UserId: 11,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 11,
      email: "user1@example.com",
      password: "$2a$10$SeYG3599IGfmLBXIjdG30.8/wB0Bt55k9u9p58b4o4nZd/I00Z5HC",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/corgi?lock=22",
      introduction:
        "Omnis repudiandae quasi magni ab eius qui qui dignissimos aut.\nFugit numquam cum ducimus recusandae reprehenderit et.\nUt ea voluptatem veniam iure et voluptatem molestiae necessitatibus rem.\nEt minima fuga nihil error distinctio at.",
      role: "user",
      account: "user1",
      cover: "https://loremflickr.com/320/240/corgi?lock=28",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 351,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 1,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 101,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 2,
    repliedCount: 3,
  },
  {
    id: 361,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 111,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 371,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 121,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 381,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 1,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 131,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 391,
    UserId: 41,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 41,
      email: "user4@example.com",
      password: "$2a$10$Jh0cW0qoYM7DHHegSBLsKOxJSpI404n0VHF91JYcPBvVbhWeyY1Pi",
      name: "user4",
      avatar: "https://loremflickr.com/320/240/corgi?lock=35.78072479906069",
      introduction: "inventore reprehenderit architecto",
      role: "user",
      account: "user4",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.73632671381464",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 2,
    repliedCount: 3,
  },
  {
    id: 141,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 401,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 151,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 1,
    likedCount: 2,
    repliedCount: 3,
  },
  {
    id: 411,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 161,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 1,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 421,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 0,
    likedCount: 3,
    repliedCount: 3,
  },
  {
    id: 171,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 431,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 181,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 441,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 1,
    likedCount: 3,
    repliedCount: 3,
  },
  {
    id: 191,
    UserId: 21,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 21,
      email: "user2@example.com",
      password: "$2a$10$zqzA.zVih81hSv9ihEiheeG1WjT1qDubSE14bjQs3hAPwBgmmnKni",
      name: "user2",
      avatar: "https://loremflickr.com/320/240/corgi?lock=46.44188312924983",
      introduction:
        "Necessitatibus alias enim sit quibusdam ad sunt qui rem. Voluptas esse error non. Necessitatibus tempora illo nulla quia sapiente tenetur enim asperiores voluptatem. Iusto voluptatem iusto quidem sunt id velit est. Voluptatem perspiciatis fuga quos laboriosam.",
      role: "user",
      account: "user2",
      cover: "https://loremflickr.com/320/240/corgi?lock=16.16188984318153",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 451,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 201,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 461,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 211,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 471,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 1,
    likedCount: 2,
    repliedCount: 3,
  },
  {
    id: 221,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
  },
  {
    id: 481,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 231,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 1,
    likedCount: 2,
    repliedCount: 3,
  },
  {
    id: 491,
    UserId: 51,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 51,
      email: "user5@example.com",
      password: "$2a$10$DCBepT9QcJtymUJrYh6tzubUnb60ONmJi6hh9zWjA3cWlQTghhSqK",
      name: "user5",
      avatar: "https://loremflickr.com/320/240/corgi?lock=2.7801211160881523",
      introduction: "quidem at occaecati",
      role: "user",
      account: "user5",
      cover: "https://loremflickr.com/320/240/corgi?lock=45.88187153869474",
      createdAt: "2020-12-19T16:13:51.000Z",
      updatedAt: "2020-12-19T16:13:51.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 241,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 1,
    repliedCount: 3,
  },
  {
    id: 251,
    UserId: 31,
    description: "this is seed tweet",
    createdAt: "2020-12-19T16:13:51.000Z",
    updatedAt: "2020-12-19T16:13:51.000Z",
    User: {
      id: 31,
      email: "user3@example.com",
      password: "$2a$10$eK3sh10B/NamnZ1opfA6Dem/Ud0K/qHjX4V0tfVru20W.IrG9MqWC",
      name: "user3",
      avatar: "https://loremflickr.com/320/240/corgi?lock=26.41331684533894",
      introduction: "et",
      role: "user",
      account: "user3",
      cover: "https://loremflickr.com/320/240/corgi?lock=14.925113923624146",
      createdAt: "2020-12-19T16:13:50.000Z",
      updatedAt: "2020-12-19T16:13:50.000Z",
    },
    isLiked: 0,
    likedCount: 0,
    repliedCount: 3,
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
    // async fetchData() {
    //   try {
    //     const data = await adminAPI.users.get();
    //     console.log(data);
    //   } catch (error) {
    //     Toast.fire({
    //       icon: "error",
    //       title: "無法取得推文資料，請稍後再試",
    //     });
    //   }
    // },
    deleteTweets(tweetId) {
      this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
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