import Vue from 'vue';
import * as api from '@/api';
import * as utils from '@/utils/utils';
import "@/assets/style/style.css";

Vue.config.productionTip = false
Vue.prototype.api = api;
Vue.prototype.utils = utils;