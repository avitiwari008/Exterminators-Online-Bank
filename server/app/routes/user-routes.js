'use strict';

const UserController = require('../controllers/user-Controller');

module.exports = (app) => {
    app.route('/users')
    .get(UserController.list);

    console.log("inside user- routes");
    app.route('/users/:email')
        .put(UserController.updateUser); 
};
 