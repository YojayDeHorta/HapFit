import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

/* Establish Connection */
const socketConnection = SocketIO(process.env.VUE_APP_BASE_URL ,{ transports : ['websocket'] });

Vue.use(new VueSocketIO({
    // debug: true,
    connection:socketConnection 
  })
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
