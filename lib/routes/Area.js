'use strict';

const Joi              = require('joi');
const AuxFns           = require('../util/AreaFunctions');
const Handler          = require('../util/AreaHandlers');
const ErrorHandler     = require('../util/ErrorHandler');
const ResponseSchemas  = require('../schemas/200/GetArea');
const CreateAreaSchema = require('../schemas/CreateArea');

module.exports = [
    {
        // Get Area
        method: 'GET',
        path  : '/area/{id}',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for Specific Area',
            notes      : 'Get the specified Area',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getArea, assign: 'preVal' }
            ],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The Area ID to Search')
                },
                failAction: ErrorHandler
            },
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchemas.getAreaSchema.label('Area')
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
        // Get All the Areas
        method: 'GET',
        path  : '/area',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for all the Areas',
            notes      : 'Get all the areas',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getAreas, assign: 'preVal' }
            ],
            validate   : {
                failAction: ErrorHandler
            },
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchemas.getAreasSchema.label('Area')
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
        // Create Area
        method: 'POST',
        path  : `/area`,
        config: {
            handler: Handler.post,
            pre    : [
                { method: AuxFns.getArea, assign: 'preVal' }
            ],
            description: 'POST Endpoint for Specific Area',
            notes      : 'Create a Area',
            tags       : ['api'],
            validate   : {
                payload: {
                    area: CreateAreaSchema
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
                            }).label('Area')
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
        // Modify Area
        method: 'PUT',
        path  : `/area`,
        config: {
            handler: Handler.put,
            pre    : [
                { method: AuxFns.deleteAreaPre, assign: 'preVal' }
            ],
            description: 'PUT Endpoint for Specific Area',
            notes      : 'Edit the specific area',
            tags       : ['api'],
            validate   : {
                payload: {
                    id: Joi.string()
                        .required()
                        .description('The area ID needed to be edited'),
                    area: CreateAreaSchema
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
                            }).label('Area')
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
        // Delete Area
        method: 'DELETE',
        path  : `/area/{id}`,
        config: {
            handler: Handler.delete,
            pre    : [
                { method: AuxFns.deleteAreaPre, assign: 'preVal' }
            ],
            description: 'DELETE Endpoint for Specific Area',
            notes      : 'Delete the Specific Area',
            tags       : ['api'],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The ID of the area to be deleted')
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
                            }).label('Area')
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
