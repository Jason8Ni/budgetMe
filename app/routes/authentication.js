var express = require("express"),
	router = express.Router(),
	bodyParser = require("body-parser"),
	parseUrlencoded = bodyParser.urlencoded({ extended:false }),
	async = require('async'),
	pool = process.pool, 
	authentication = require('../')
    
import Authentication from '@/components/pages/Authentication/Authentication'

// Session Middleware
router.use(function(req,res,next) {
  	next()
})

router.route("/")
	.get(function(req,res) {
		res.render('home/index', {
			ADDRESS:process.env.ADDRESS,
			PORT:process.env.PORT,
			ENV:process.env.ENV,
			MINIFY:process.env.MINIFY
		})

	})

module.exports = router