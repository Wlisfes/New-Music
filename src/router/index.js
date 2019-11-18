import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import routes from '@/router/routes';

Vue.use(Router);
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    
    //查看是否有过渡动画
    if(to.meta.transitionName) {
        store.commit('app/setTransitionName', to.meta.transitionName)
    }
    next()
})

router.afterEach(() => {

})

export default router;