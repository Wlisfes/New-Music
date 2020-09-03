import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'

Vue.use(Router)
const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	console.log(to)
	if (to.path === '/dayplay') {
		wx.miniProgram.navigateTo({ url: '/pages/logs/logs' })
		return
	}
	next()
})

router.afterEach(() => {})

export default router
