'use strict';
const { customAlphabet } = require('nanoid');

const mongoose = require('mongoose');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 9)
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todolist object.
 */
let AccBalSchema = new Schema({

    AccountNumber: {
        type: String,
        default: function getNanoId() {
            let accNum = nanoid()
            return accNum.toUpperCase();
        }
    },

    CurrentBalance: {
        type: Number,
        default: 0,
    },

    routingNumber: {
        type: Number,
        default: "111222333"
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'active'
    },
},
    {
        versionKey: false
    });

// Duplicate the id field as mongoose returns _id field instead of id.
AccBalSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
AccBalSchema.set('toJSON', {
    virtuals: true
});

const Account = mongoose.model("accounts", AccBalSchema);

module.exports = { Account, AccBalSchema };

