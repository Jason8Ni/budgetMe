const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    consign = require('consign'),
    cors = require('cors'),
    passport = require('passport'),
    passportConfig = require('./passport')(passport),
    jwt = require('jsonwebtoken'),
    config = require('./index.js'),
    database = require('./db')(mongoose, config),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    crypto = require('crypto');

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(favicon());
app.use(session({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session())




app.set('mySecret', config.secret);
app.set('view enginer', 'jade')
app.set('views', __dirname + '/views');

consign({ cwd: 'services' })
    .include('budgetAPI/app/setup')
    .then('budgetAPI/app/api')
    .then('budgetAPI/app/routers')
    .into(app);

module.exports = app;