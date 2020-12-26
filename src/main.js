import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SocketIO from 'socket.io'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://metinseylan.com:1992'), // options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);