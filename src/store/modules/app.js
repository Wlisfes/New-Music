import Vue from 'vue';

const state = {
    active: 0,               //默认页码
    player: false,           //播放器默认关闭
    User: null,          //用户信息

}

const mutations = {
    setActive: (state, active) => {
        state.active = active
    },
    setPlayer: (state, player) => {
        state.player = player
    },
    setUser: (state, User) => {
        state.User = User
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}