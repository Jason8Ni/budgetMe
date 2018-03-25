const PassJWT = require('passport-jwt'),
    ExtractJWT = PassportJWT.ExtractJwt,
    Strategy = PassportJWT.Strategy,
    config = require('./index.js'),
    models = require('./../../../models/index');

module.exports = (passport) => {
    const User = models.Users;

    const parameters = {
        secret: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };

    passport.use(new Stragety(parameters, (payload, finish) => {
        User.findOne({ id: payload.id }, (err, user) => {
            if (err) { return finish(err, false) }
            if (user) { return finish(null, user) }
        })
    })
}