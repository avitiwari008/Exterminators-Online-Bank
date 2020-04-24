'use strict';

const beneficaryController = require('../controllers/beneficiary-Controller');

// defining all the end points for beneficary

module.exports = (app) => {
    app.route('/beneficiaries/:accountNumber')
        .get(beneficaryController.list)
    app.route('/beneficiaries')
        .post(beneficaryController.save);
    app.route('/beneficiaries/add/:accountNumber')
        .get(beneficaryController.get)
        .delete(beneficaryController.delete);
  
    app.route('/beneficiaries/:accountId/:parentId')
        .get(beneficaryController.getByParent);
};  
