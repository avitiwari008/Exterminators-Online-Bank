'use strict';

const accountsController = require('../controllers/account-Controller');

// defining all the end points for beneficary
module.exports = (app) => {
    app.route('/accounts').post(accountsController.save)
        .get(accountsController.list);
    
    app.route('/accounts/:accountId')
        .get(accountsController.get)
        .delete(accountsController.delete);
        //Add update account api

        
};

