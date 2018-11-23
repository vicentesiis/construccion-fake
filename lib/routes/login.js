'use strict';

const Joi                = require('joi');
const AuxFn              = require('../util/LoginFunctions');
const Handler            = require('../util/LoginHandlers');
const ErrorHandler       = require('../util/ErrorHandler');
const UserResponseSchema = require('../schemas/200/GetUser');

module.exports = {
    method: 'POST',
    path  : '/login',
    config: {
        auth   : false,
        handler: Handler.post,
        pre    : [
            {
                method: AuxFn.comparePassword, assign: 'matches'
            }
        ],
        description: 'POST Endpoint for Login',
        notes      : 'Log the user to the application',
        tags       : ['api'],
        validate   : {
            payload: Joi.object({
                username: Joi.string()
                    .email()
                    .required()
                    .description('This is the email registered'),
                password: Joi.string()
                    .base64()
                    .required()
                    .description('The password stored in the db, in Base64')
            }),
            failAction: ErrorHandler
        },
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        'description': 'Success',
                        'schema'     : Joi.object().keys({
                            code   : Joi.number().example(200),
                            message: Joi.string(),
                            token  : Joi.string(),
                            user   : UserResponseSchema
                        }).label('Login')
                    },
                    '400': { 'description': 'BadRequest' },
                    '404': { 'description': 'NotFound' },
                    '500': { 'description': 'ServerError' }
                }
            }
        }
    }
};
