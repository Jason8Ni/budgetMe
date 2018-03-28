const models = require('@Budget/app/setup')

module.exports = (app) => {
    const api = app.budgetAPI.app.api.authentication;

    app.route('/')
        .get((req, res) => res.send("API"));

    app.route('/api/v1/authentication')
        .post(api.login(models.User));
}