'use strict';

const registerService = require('../services/register-service');
const accountService = require('../services/account-service');
const emailService = require('../services/email-service');
const mongoose = require('mongoose'),
    User = mongoose.model('user');

exports.list = (request, response) => {
    const params = {};
    const promise = registerService.Search(params);
    const result = (items) => {
        response.status(200);
        response.json(items);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new list and sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (request, response) => {

    if (!request.body.firstName) {
        return response.status(400).send({
            message: "firstName cannot be empty"
        });
    }
    if (!request.body.lastName) {
        return response.status(400).send({
            message: "lastName cannot be empty"
        });
    }
    let newUser;
    let newAccount;
    const user = Object.assign({}, request.body);
    const result = (saveditem) => {
        newAccount = saveditem;
        user.account = newAccount;
        
        const userResult = (savedUserItem) => {
            newUser = savedUserItem;
            response.status(201);
            response.json(newUser);
            //call to email service
            emailService.sendEmail(newUser);
        };
        const userPromise = registerService.save(user);
        userPromise
            .then(userResult)
            .catch(renderErrorResponse(response));
    };
    const promise = accountService.save({});
    promise
        .then(result)
        .catch(renderErrorResponse(response));


};

// /**
//  * Throws error if error object is present.
//  *
//  * @param {Response} response The response object
//  * @return {Function} The error handler function.
//  */
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
