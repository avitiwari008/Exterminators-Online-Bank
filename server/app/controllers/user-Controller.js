'use strict';

const userService = require('../services/user-service');
const mongoose = require('mongoose'),
    User = mongoose.model('user');


exports.list = (request, response) => {
    const totalQuery = request.query.total;
    const params = {};
    if (totalQuery) {
        params.total = totalQuery
    };
    const promise = userService.Search(params);
    const result = (items) => {
        response.status(200);
        response.json(items);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

exports.updateUser = (request, response) => {
    const email = request.params.email;
    let updatedUser = request.body;
    let dbuser ;
    //Find by Email
    userService.searchUserByEmail(email)
        .then(item => {
            dbuser = item;
            dbuser.password = updatedUser.password
            dbuser.phoneNumber = updatedUser.phoneNumber;
            dbuser.addressLine1 = updatedUser.addressLine1;
            dbuser.dob = updatedUser.dob;
            dbuser.addressLine2 = updatedUser.addressLine2;
            dbuser.city = updatedUser.city;
            dbuser.state = updatedUser.state;
            dbuser.zip = updatedUser.zip;
            
            //Update the user
            userService.update(dbuser)
                .then(updatedItem =>{
                    response.status(200).json({
                        message : 'Profile updated for user with email id : ' + updatedItem.email
                    });
                })
                .catch(err => {
                    response.status(500).json({
                        message: "Unable to update the user"
                    });
                })
        })
        .catch(err => {
            response.status(500).json({
                message: "Something went wrong"
            });
        });
    }


let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};