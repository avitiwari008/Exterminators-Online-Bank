'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('user');

// seach for all the users
exports.Search = (params) => {
    const promise = User.find(params).exec();
    return promise;
};

// seach for user by email ID
exports.searchUserByEmail = (email) => {
    const promise = User.findOne({ email: email }).exec();
    return promise;
};

/**
 * Updates an existing user item.
 *
 * @param updatedUser
*/
exports.update = (updatedUser) => {
    const promise = User.findByIdAndUpdate(updatedUser.id, updatedUser).exec();
    return promise;
};