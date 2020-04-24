'use strict';

const contactusService = require('../services/contactus-service');
const mongoose = require('mongoose'),
    ContactUs = mongoose.model('contactus');


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
    if (!request.body.accountNumber) {

        return response.status(400).send({
            message: "accountNumber cannot be empty"
        });
    }
    if (!request.body.description) {

        return response.status(400).send({
            message: "Description cannot be empty"
        });
    }
    if (!request.body.category) {

        return response.status(400).send({
            message: "Category cannot be empty"
        });
    }

    const contactus = Object.assign({}, request.body);
    const result = (saveditem) => {
        response.status(201);
        response.json(saveditem);
    };
    const promise = contactusService.save(contactus);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Sets response for item search and return all.
 *
 * @param request
 * @param response
*/
exports.list = (request, response) => {
    const params = {};
    const promise = contactusService.SearchAll(params);
    const result = (items) => {
        response.status(200);
        response.json(items);
    };
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