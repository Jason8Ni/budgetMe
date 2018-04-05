import Vue from 'vue'
import Router from 'vue-router'
import * as Auth from '@components/pages/Authentication'

//import Authentication from '@/components/pages/Authentication/Authentication'

// Session Middleware
Vue.use(router)

export default new Router({
	routes: [
		{
			path: '/login',
			name: 'Authentication',
			component: Authentication
		}
		
	]
})

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		if (Auth.default.user.authenticated) {
			next()
		} else {
			router.push('/login')
		}
	} else {
		next()
	}
})

module.exports = router