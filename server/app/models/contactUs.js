'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todolist object.
 */
let ContactUsSchema = new Schema({

    firstName: {
        type: String,
        required: "Name is missing"
    },
    lastName: {
        type: String,
        required: "LastName is missing"
    },
    email : {
        type: String,
        required: 'Email is missing'
    },
    accountNumber: {
        type: String,
        required: "Number is missing"
    },
    description : {
        type: String,
        required: "Description is missing"
    },
    category: {
        type: String,
        required: "Category is missing"
    }

},
    {
        versionKey: false
    });
// Duplicate the id field as mongoose returns _id field instead of id.
ContactUsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ContactUsSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('contactus', ContactUsSchema);