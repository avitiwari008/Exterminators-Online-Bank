'use strict';

const loginService = require('../services/login-service');
const mongoose = require('mongoose'),
    User = mongoose.model('user');

/**
 * get method to list all users
 *
 * @param request
 * @param response
*/
exports.list = (request, response) => {
    const totalQuery = request.query.total;
    const params = {};
    if (totalQuery) {
        params.total = totalQuery
    };
    const promise = loginService.Search(params);
    const result = (items) => {
        response.status(200);
        response.json(items);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

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

/**
 * get method for the finding items by passing id it will return 1 item
 *
 * @param request
 * @param response
*/
exports.get = (request, response) => {
    const email = request.params.email;

    const total = loginService.searchUserByEmail(email)
        .then(item => {
            response.status(200).json(item);
        })
        .catch(err => {
            response.status(500).json({
                message: "not proper id format"
            });
        });
};

exports.updateLastLogin = (request, response) => {
    const email = request.params.email;
    let user;
    //Find by Email
    loginService.searchUserByEmail(email)
        .then(item => {
            user = item;
            user.modifiedDate = new Date().toISOString();
            user.lastLoginDate = new Date().toISOString();
            //Update the user
            loginService.update(user)
                .then(updatedItem =>{
                    response.status(200).json({
                        message : 'Last login time updated for user with email id : ' + updatedItem.email
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