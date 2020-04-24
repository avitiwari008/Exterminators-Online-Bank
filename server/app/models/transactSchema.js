'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todolist object.
 */
let TransactSchema = new Schema({

    ownerAccountNum: {
        type: String,
        required: [true, 'Account Number is required']
    },

    beneficiaryAccountNumber:{
        type: String
    },

    //mark it as debit/credit/transfer to reflect it in the report
    //transaction type
    type: {
        type: String
    },

    //money spent on category: food, travel, shopping
    category: {
        type: String
    },

    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    
    transactionDate: { 
        type : Date, 
        default: Date.now
    }
},
    {
        versionKey: false
    });

// Duplicate the id field as mongoose returns _id field instead of id.
TransactSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TransactSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('transactions', TransactSchema);