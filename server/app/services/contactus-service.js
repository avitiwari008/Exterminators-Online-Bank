'use strict';
const mongoose = require('mongoose'),
    ContactUs = mongoose.model('contactus');


// seach for all the ContactUs
exports.SearchAll = (params) => {
    const promise = ContactUs.find(params).exec();
    return promise;
};



/**
 * Saves the new ContactUs object.
 *
 * @param ContactUs
*/
exports.save = (contactus) => {
    const newContactUs = new ContactUs(contactus);
    return newContactUs.save();
};

