/*
 * @Date: 2019-12-06 14:25:35
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-12-10 17:32:56
 * @Description: 音频播放器store
 */


import { Toast } from 'vant';


const state = {
    audio: null,           //音频对象
    player: false,         //播放器默认关闭
    play: false,           //播放状态
    playid: '',            //播放歌曲id
    sonplayid: '',         //播放歌单id
    playlist: [],          //播放中的歌曲列表
    playIndex: -1,         //播放第几首
    picUrl: '',            //歌曲封面
    playUrl: '',           //音乐url
    status: 1,             //播放状态  1-列表循环  2-单曲循环  3-随机  4-心动
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
    setPlayIndex: (state, playIndex) => {
        state.playIndex = playIndex
    },
    setPicUrl: (state, picUrl) => {
        state.picUrl = picUrl
    },
    setPlayUrl: (state, playUrl) => {
        state.playUrl = playUrl
    },
    //切换播放状态
    switch: (state) => {
        if(state.status < 3) {
            state.status++
        }
        else {
            state.status = 1
        }
        switch (state.status) {
            case 1:
                Toast('列表循环');
                break;
            case 2:
                Toast('单曲循环');
                break;
            case 3:
                Toast('随机播放');
                break;
        }
    },
    //上一首
    prev: (state) => {
        const playlist = state.playlist
        const playIndex = state.playIndex

        if(playlist.length === 0 || playIndex === -1) {
            Toast('歌单暂无歌曲');
            return
        }
        else {
            if(playIndex < playlist.length - 1) {
                state.playIndex ++
                state.playid = playlist[state.playIndex].id
                state.picUrl = playlist[state.playIndex].al.picUrl
            }
            else {
                state.playIndex = 1
                state.playid = playlist[state.playIndex].id
                state.picUrl = playlist[state.playIndex].al.picUrl
            }
        }
    },
    //下一首
    next: (state) => {
        const playlist = state.playlist
        const playIndex = state.playIndex

        if(playlist.length === 0 || playIndex === -1) {
            Toast('歌单暂无歌曲');
            return
        }
        else {
            if(playIndex < playlist.length - 1) {
                state.playIndex ++
                state.playid = playlist[state.playIndex].id
                state.picUrl = playlist[state.playIndex].al.picUrl
            }
            else {
                state.playIndex = 1
                state.playid = playlist[state.playIndex].id
                state.picUrl = playlist[state.playIndex].al.picUrl
            }
        }
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