import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import design from './modules/design';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    design
  }
})
