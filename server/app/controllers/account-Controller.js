'use strict';

const accountService = require('../services/account-service');
const mongoose = require('mongoose'),
    Account = mongoose.model('accounts');


/**
 * Creates a new list and sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (request, response) => {
    // if (!request.body.firstName) {

    //     return response.status(400).send({
    //         message: "firstName cannot be empty"
    //     });
    // }
    //push validation in services
    const account = Object.assign({}, request.body);
    const result = (saveditem) => {
        response.status(201);
        response.json(saveditem);
    };
    const promise = accountService.save(account);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};


/**
 * get method for the finding items by passing id it will return 1 item
 *
 * @param request
 * @param response
*/
exports.get = (request, response) => {
    const accountId = request.params.accountId;

    const total = accountService.searchAllByAccountId(accountId)
        .then(item => {
            if (item != null) {
                response.status(200).json(item);
            } else {
                response.status(404).json({
                    message: "Account Not found"
                });
            }

        })
        .catch(err => {
            response.status(500).json({
                message: "not proper id format"
            });
        });
};




/**
 * Sets response for item search and return all.
 *
 * @param request
 * @param response
*/
exports.list = (request, response) => {

    const params = {};

    const promise = accountService.searchAll(params);
    const result = (items) => {
        response.status(200);
        response.json(items);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};



/**
 * Delete the Account based on the accountnumber
 *
 * @param request
 * @param response
*/
exports.delete = (request, response) => {
    const accountId = request.params.accountId;


    const promise = accountService.delete(accountId);
    promise
        .then(account => {
            if (account) {
                return response.status(200).json({
                    message: "Account deleted"
                });
            } response.status(404).json({
                message: "Account not found"
            });

        })
        .catch(err => {
            response.status(500).json({
                message: "enter correct Account Number",
            });
        });
}

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