'use strict';

const contactUsController = require('../controllers/contactus-Controller');

// defining all the end points for contactUs

module.exports = (app) => {
    app.route('/complaints')
        .get(contactUsController.list)
        .post(contactUsController.save);
};