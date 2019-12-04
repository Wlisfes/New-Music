import Vue from 'vue';
import Storage from 'vue-ls';
import * as api from '@/api';
import * as utils from '@/utils/utils';


Vue.use(Storage, {
    namespace: 'pro__',
    name: 'ls',
    storage: 'local'
});
Vue.prototype.api = api;
Vue.prototype.utils = utils;


