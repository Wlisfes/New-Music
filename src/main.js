
import "@babel/polyfill";
import "lib-flexible/flexible";

import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import "@/core/use";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
