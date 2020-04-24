'use strict';
const mongoose = require('mongoose'),
    Transaction = mongoose.model('transactions');



// seach for all the owneraccountnumber 
exports.Search = (accountId) => {
    const txn = new Transaction();

    const promise = Transaction.find({ ownerAccountNum: accountId }).limit(5).sort({ transactionDate: - 1 }).exec();
    return promise;
};

exports.pdf = (accountId) => {
    const txn = new Transaction();
    const promise = Transaction.find({ ownerAccountNum: accountId }).sort({ transactionDate: - 1 }).exec();
    return promise;
};