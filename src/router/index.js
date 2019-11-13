
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@views/home/Home';

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: 'Home',
        meta: {},
        component: Home
    }
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach(() => {

})

export default router;