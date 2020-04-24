'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todolist object.
 */
let BeneficiarySchema = new Schema({

    firstName: {
        type: String,
        required: "Name is missing"
    },
    lastName: {
        type: String,
        required: "LastName is missing"
    },
    accountNumber: {
        type: String,
        required: "Number is missing"
    },
    nickName: {
        type: String,
        required: "nickname is missing"
    },
    routingNumber: {
        type: Number,
    },
    parentAccountNumber: {
        type: String,
        required: "Number is missing"
    }

},
    {
        versionKey: false
    });
// Duplicate the id field as mongoose returns _id field instead of id.
BeneficiarySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
BeneficiarySchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('beneficiary', BeneficiarySchema);