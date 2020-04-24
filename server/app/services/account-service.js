'use strict';
const mongoose = require('mongoose'),
    Accounts = mongoose.model('accounts');


// seach for all the Beneficiary
exports.searchAll = (params) => {
    const promise = Accounts.find(params).exec();
    return promise;
};


// seach for all the Beneficiary by accntnumber
exports.searchAllByAccountId = (accountId) => {
    const promise = Accounts.findOne({ AccountNumber: accountId }).exec();
    return promise;
};
/**
 * Create an Account.
 *
 * @param account
// */
exports.save = (account) => {
    const newAccount = new Accounts(account);

    return newAccount.save();
};

/**
 * Deletes an existing order.
 *
 * @param accountId
// */
exports.delete = (accountId) => {

    const promise = Accounts.findOneAndDelete({ AccountNumber: accountId }).exec();

    return promise;
};