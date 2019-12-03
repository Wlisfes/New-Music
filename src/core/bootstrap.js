import Vue from 'vue';
import store from '@/store';

export default function Initializer() {
    store.commit('app/setUser', Vue.ls.get('UserAccessToken'))
}