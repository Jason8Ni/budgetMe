const models = require('@Budget/app/setup'),
    passport = require('passport'),
    config = require('@config');

    module.exports = (app) => {
        const api = app.budgetAPI.app.api.authentication;
        
        app.route('/api/v1/setup')
        .post(api.setup(models.User))

        
    
    
    }    