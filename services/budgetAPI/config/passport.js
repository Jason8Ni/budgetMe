const PassJWT = require('passport-jwt'),
    ExtractJWT = PassJWT.ExtractJwt,
    Strategy = PassJWT.Strategy,
    config = require('./index.js'),
    models = require('@Budget/app/setup');

module.exports = (passport) => {
    const User = models.User;

    const parameters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };

    passport.use(new Strategy(parameters, (payload, finish) => {
        User.findOne({ id: payload.id }, (err, user) => {
            if (err) { return finish(err, false) }
            if (user) { return finish(null, user) }
        })
    }))
}