import Vue from 'vue';
import Storage from 'vue-ls';
import * as api from '@/api';
import * as utils from '@/utils/utils';
import VConsole from 'vconsole';
var vConsole = new VConsole();

Vue.use(Storage, {
	namespace: 'pro__',
	name: 'ls',
	storage: 'local'
});
Vue.prototype.api = api;
Vue.prototype.utils = utils;
Vue.prototype.vm = new Vue();
