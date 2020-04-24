'use strict';

const loginController = require('../controllers/login-Controller');

module.exports = (app) => {
    app.route('/login').get(loginController.list);
    app.route('/login/:email')
        .get(loginController.get);
    app.route('/login/:email/lastlogin')
        .put(loginController.updateLastLogin);      
};
 