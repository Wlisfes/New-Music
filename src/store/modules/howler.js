/*
 * @Date: 2019-12-06 14:25:35
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-12-06 14:26:42
 * @Description: 音频播放器store
 */



const state = {
    play: false,           //播放状态
    playid: '',            //播放歌曲id
    sonplayid: '',         //播放歌单id
    playlist: [],          //播放中的歌曲列表
}

const mutations = {
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