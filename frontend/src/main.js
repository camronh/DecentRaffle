import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { ethers } from "ethers";
// You need a specific loader for CSS files
// import DatetimePicker from "vuetify-datetime-picker";
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'

// Vue.use(DatetimePicker);
Vue.prototype.$ethers = ethers;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  ethers,
  render: (h) => h(App),
}).$mount("#app");

// Initialize ethers store
// store.dispatch('ethers/init')
