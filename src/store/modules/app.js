
const state = {
    transitionName: '',     //首页动画过渡
}


const mutations = {
    setTransitionName: (state, transitionName) => {
        state.transitionName = transitionName
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