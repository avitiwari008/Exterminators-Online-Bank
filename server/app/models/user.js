'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const accBalSchema = require("./accountBalSchema").AccBalSchema;

/**
 * Mongoose schema for todolist object.
 */
let UserSchema = new Schema({

    account : accBalSchema,

    firstName: {
        type: String,
        required: "First Name is required"
    },
    lastName: {
        type: String,
        required: "Last Name is missing"
    },
    dob :{
        type: Date,
        required: "Date of birth is missing"
    },
    email:{
        type: String,
        required : "Email is missing"
    },
    phoneNumber:{
        type: Number
    },
    ssn:{
        type: Number,
        required : "Social Security Number is missing"
    },
    addressLine1: {
        type : String,
        required : "Address is missing"
    },
    addressLine2: {
        type : String
    },
    city: {
        type : String,
        required : "City is missing"
    },
    state: {
        type : String,
        required : "State is missing"
    },
    zip: {
        type : Number,
        required : "Zip Code is missing"
    },

    password: {
        type : String,
        required : "Password is missing"
    },
    status: {
        type: String,
        enum : ['active','inactive', 'deleted'],
        default: 'active'
    },
    createdDate: { 
        type : Date, 
        default: Date.now
    },
    modifiedDate: { 
        type : Date, 
        default: Date.now
    },
    lastLoginDate: { 
        type : Date, 
        default: Date.now
    },
    role: { 
        type : String,
        enum : ['user','admin', 'customercare'], 
        default: 'user'
    },

},
{
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model("user", UserSchema);

module.exports = {User, UserSchema};
