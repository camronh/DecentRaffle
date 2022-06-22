import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { ethers } from "ethers"

Vue.prototype.$ethers = ethers; 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  ethers,
  render: h => h(App)
}).$mount('#app')


// Initialize ethers store
// store.dispatch('ethers/init')
