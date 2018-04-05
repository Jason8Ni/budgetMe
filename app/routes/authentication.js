import Vue from 'vue'
import Router from 'vue-router'
import * as Auth from '@components/pages/Authentication'
import * as Home from '@components/pages/Home'
//import Authentication from '@/components/pages/Authentication/Authentication'

// Session Middleware
Vue.use(router)

export default new Router({
	routes: [
		{
			path:'/', 
			name: 'Home',
			component: Home
		}
		,
		{
			path: '/login',
			name: 'Authentication',
			component: Authentication
		}

	]
})
//got to be a better way to route these? AKA more modular... not sure will have to look into

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