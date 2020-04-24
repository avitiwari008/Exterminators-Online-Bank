'use strict';
const mongoose = require('mongoose'),
    Beneficiary = mongoose.model('beneficiary');


// seach for all the Beneficiary
exports.Search = (params) => {
    const promise = Beneficiary.find(params).exec();
    return promise;
};

exports.searchbeneficiaryList = (accountId) => {
    const promise = Beneficiary.find({ parentAccountNumber: accountId }).exec();
    return promise;
};

exports.searchByAccountAndParent = (accountId, parentAccountId) => {
    const promise = Beneficiary.find({ $and:[{accountNumber: accountId}, {parentAccountNumber: parentAccountId}] }).exec();
    return promise;
};

// seach for all the Beneficiary by accntnumber
exports.search = (accountId) => {
    const promise = Beneficiary.findOne({ accountNumber: accountId }).exec();
    return promise;
};
/**
 * Saves the new Beneficiary object.
 *
 * @param Beneficiary
*/
exports.save = (beneficiary) => {


    const newBeneficiary = new Beneficiary(beneficiary);

    return newBeneficiary.save();
};


/**
 * Deletes an existing order.
 *
 * @param accountNumber
// */
exports.delete = (accountId) => {

    const promise = Beneficiary.findOneAndDelete({ accountNumber: accountId }).exec();

    return promise;
};

// find beneficiary by id
exports.get = (accountId) => {
    const itemPromise = Beneficiary.findOne({ accountNumber: accountId }).exec();
    return itemPromise;
};