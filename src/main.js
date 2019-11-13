
import "@babel/polyfill";
import "lib-flexible/flexible";

import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import * as api from '@/api';
import "@/assets/style/style.css";

Vue.config.productionTip = false
Vue.prototype.api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
