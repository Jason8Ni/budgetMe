const models = require('@Budget/app/setup'),
    passport = require('passport'),
    config = require('@config');

module.exports = (app) => {
    const api = app.budgetAPI.app.api.authentication;

    app.route('/api/v1/setup')
        .post(api.createUser(models.User))

    app.route('/api/v1/users')
        .get(passport.authenticate('jwt', config.session),
        api.index(models.User, app.get('mySecret')));

    app.route('/api/v1/signup')
        .post(api.signup(models.User));
}    