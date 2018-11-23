'use strict';

// TODO const Bcrypt           = require('bcryptjs');
const Joi = require('joi');
const AuxFns           = require('../util/UserFunctions');
const Handler          = require('../util/UserHandlers');
const ErrorHandler     = require('../util/ErrorHandler');
const ResponseSchema   = require('../schemas/200/GetUser');
const CreateUserSchema = require('../schemas/CreateUser');

module.exports = [
    {
        // Get User
        method: 'GET',
        path  : `/user/{id}`,
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for Specific User',
            notes      : 'Get the Specific User',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getUser, assign: 'preVal' }
            ],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The user ID for the User needed')
                },
                failAction: ErrorHandler
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchema.getUserSchema.label('User')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    },
    {
        // Get All the users
        method: 'GET',
        path  : '/user',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for all the Users',
            notes      : 'Get all the users',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getUsers, assign: 'preVal' }
            ],
            validate: {
                failAction: ErrorHandler
            },
            plugins : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchema.getUsersSchema.label('User')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    },
    {
        // Create User
        method: 'POST',
        path  : `/user`,
        config: {
            auth: false,
            handler: Handler.post,
            pre    : [
                { method: AuxFns.getUser, assign: 'preVal' }
            ],
            description: 'POST Endpoint for Specific User',
            notes      : 'Create an user',
            tags       : ['api'],
            validate   : {
                payload: {
                    user: CreateUserSchema
                },
                failAction: ErrorHandler
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : Joi.object().keys({
                                code   : Joi.number().example(200),
                                message: Joi.string()
                            }).label('User')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    },
    {
        // Modify User
        method: 'PUT',
        path  : `/user`,
        config: {
            handler: Handler.put,
            pre    : [
                { method: AuxFns.deleteUserPre, assign: 'preVal' }
            ],
            description: 'PUT Endpoint for Specific User',
            notes      : 'Edit the specific user',
            tags       : ['api'],
            validate   : {
                payload: {
                    id: Joi.string()
                        .required()
                        .description('The user ID for the User needed'),
                    user: CreateUserSchema
                },
                failAction: ErrorHandler
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : Joi.object().keys({
                                code   : Joi.number().example(200),
                                message: Joi.string()
                            }).label('User')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    },
    {
        // Delete User
        method: 'DELETE',
        path  : `/user/{id}`,
        config: {
            handler: Handler.delete,
            pre    : [
                { method: AuxFns.deleteUserPre, assign: 'preVal' }
            ],
            description: 'DELETE Endpoint for Specific User',
            notes      : 'Delete the Specific User',
            tags       : ['api'],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The user ID for the User to be deleted')
                },
                failAction: ErrorHandler
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : Joi.object().keys({
                                code   : Joi.number().example(200),
                                message: Joi.string()
                            }).label('User')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    }
];
