import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import * as api from '@/api';
import * as utils from '@/utils/utils';
import "@/assets/style/transition.less";
import "@/assets/style/style.less";

Vue.config.productionTip = false
Vue.use(AsyncComputed);
Vue.prototype.api = api;
Vue.prototype.utils = utils;