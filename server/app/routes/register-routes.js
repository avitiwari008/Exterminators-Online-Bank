'use strict';

const registerController = require('../controllers/register-Controller');

module.exports = (app) => {
    app.route('/register').get(registerController.list);
    app.route('/register').post(registerController.save);
};  