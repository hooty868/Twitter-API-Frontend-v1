import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import SignIn from '../views/SignIn'
import AdminSignIn from './../views/AdminSignIn'
import Main from '../views/main'
import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/setting/:id',
    name: 'setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile-other',
    component: () => import('../views/ProfileOther.vue')
  },
  {
    path: '/follow',
    name: 'follow-other',
    component: () => import('../views/follow.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/signin'
  },
  {
    path: '/twitterdetail/:id',
    name: 'twitterDetail',
    component: () => import('../views/twitterIndex.vue')
  },
  {
    path: '/admin/signin',
    name: 'admin-signin',
    component: AdminSignIn
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && to.name !== 'sign-in' && to.name !== 'sign-up' && to.name !== 'admin-signin') {
    next('/signin')
    return
  }

  // 如果 token 有效則轉址到餐廳首頁
  if (isAuthenticated && to.name === 'sign-in') {
    next('/main')
    return
  }

  next()
})

export default router
