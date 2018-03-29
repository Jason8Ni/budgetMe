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
            if(!user){
                return finish(null, false, {message: "Incorrect username"})
            }
            if (user) { return finish(null, user) }
        })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
      
}