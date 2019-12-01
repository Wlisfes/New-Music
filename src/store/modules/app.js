import Vue from 'vue';

const state = {
    active: 0,               //默认页码
    player: false,           //播放器默认关闭
    userInfo: null,          //用户信息

}

const mutations = {
    setActive: (state, active) => {
        state.active = active
    },
    setPlayer: (state, player) => {
        state.player = player
    },
    setUserInfo: (state, userInfo) => {
        state.userInfo = userInfo
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