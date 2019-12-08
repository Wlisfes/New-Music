/*
 * @Date: 2019-12-06 14:25:35
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-12-06 14:26:42
 * @Description: 音频播放器store
 */



const state = {
    audio: null,           //音频对象
    player: false,         //播放器默认关闭
    play: false,           //播放状态
    playid: '',            //播放歌曲id
    sonplayid: '',         //播放歌单id
    playlist: [],          //播放中的歌曲列表
    picUrl: '',            //歌曲封面
    playUrl: '',           //音乐url
}

const mutations = {
    setAudio: (state, audio) => {
        state.audio = audio
    },
    setPlayer: (state, player) => {
        state.player = player
    },
    setPlay: (state, play) => {
        state.play = play
    },
    setPlayid: (state, playid) => {
        state.playid = playid
    },
    setSonplayid: (state, sonplayid) => {
        state.sonplayid = sonplayid
    },
    setPlaylist: (state, playlist) => {
        state.playlist =  playlist
    },
    setPicUrl: (state, picUrl) => {
        state.picUrl = picUrl
    },
    setPlayUrl: (state, playUrl) => {
        state.playUrl = playUrl
    }
}

const actions = {
    actionPlayUrl: ({ commit }, playUrl) =>{
        commit('setPlayUrl', playUrl)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}