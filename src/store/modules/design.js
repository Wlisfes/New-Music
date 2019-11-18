import { banner,personalized,recommend } from '@/api'

const state = {
    banners: [],             //首页轮播图
    personalis: [],          //推荐歌单
    recommends: [],          //每日推荐歌单
}


const mutations = {
    setbanners: (state, banners) => {
        state.banners = banners
    },
    setpersonalis: (state, personalis) => {
        state.personalis = personalis
    },
    setrecommends: (state, recommends) => {
        state.recommends = recommends
    }
    
}


const actions = {
    banner: async ({ commit }, params = {}) => {
        const [err, res] = await banner(params)
        if(!err && res.code === 200) {
            const data = res.banners.map(k => ({
                picUrl: k.pic,
                id: k.bannerId
            }))
            commit('setbanners', data)
        }
        return [err,res]
    },
    personalized: async ({ commit }, params = {}) => {
        const [err, res] = await personalized(params)
        if(!err && res.code === 200) {
            const data = res.result.map(k => ({
                id: k.id,
                picUrl: k.picUrl,
                name: k.name,
                copywriter: k.copywriter
            }))
            commit('setpersonalis', data)
        }
        return [err,res]
    },
    recommend: async ({ commit }, params = {}) => {
        const [err, res] = await recommend(params)
        if(!err && res.code === 200) {
            const data = res.recommend.filter((k,v) => v < 6).map(k => ({
                id: k.id,
                picUrl: k.picUrl,
                name: k.name,
                copywriter: k.copywriter
            }))
            commit('setrecommends', data)
        }
        return [err,res]
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}