'use strict';

const Joi                  = require('joi');
const AuxFns               = require('../util/TemplateFunctions');
const Handler              = require('../util/TemplateHandlers');
const ErrorHandler         = require('../util/ErrorHandler');
const ResponseSchemas      = require('../schemas/200/GetTemplate');
const CreateTemplateSchema = require('../schemas/CreateTemplate');

module.exports = [
    {
        // Get Template
        method: 'GET',
        path  : '/template/{id}',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for Specific Template',
            notes      : 'Get the specified template',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getTemplate, assign: 'preVal' }
            ],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The Template ID to Search')
                },
                failAction: ErrorHandler
            },
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchemas.getTemplateSchema.label('Template')
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
        // Get All the templates
        method: 'GET',
        path  : '/template',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for all the Templates',
            notes      : 'Get all the templates',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getTemplates, assign: 'preVal' }
            ],
            validate: {
                failAction: ErrorHandler
            },
            plugins : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchemas.getTemplatesSchema.label('Template')
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
        // Create Template
        method: 'POST',
        path  : `/template`,
        config: {
            handler: Handler.post,
            pre    : [
                { method: AuxFns.getTemplate, assign: 'preVal' }
            ],
            description: 'POST Endpoint for Specific Template',
            notes      : 'Create a Template',
            tags       : ['api'],
            validate   : {
                payload: {
                    template: CreateTemplateSchema
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
                            }).label('Template')
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
        // Modify Project
        method: 'PUT',
        path  : `/template`,
        config: {
            handler: Handler.put,
            pre    : [
                { method: AuxFns.deleteTemplatePre, assign: 'preVal' }
            ],
            description: 'PUT Endpoint for Specific Template',
            notes      : 'Edit the specific template',
            tags       : ['api'],
            validate   : {
                payload: {
                    id: Joi.string()
                        .required()
                        .description('The Template ID needed to be edited'),
                    template: CreateTemplateSchema
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
                            }).label('Template')
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
        // Delete Project
        method: 'DELETE',
        path  : `/template/{id}`,
        config: {
            handler: Handler.delete,
            pre    : [
                { method: AuxFns.deleteTemplatePre, assign: 'preVal' }
            ],
            description: 'DELETE Endpoint for Specific Template',
            notes      : 'Delete the Specific Template',
            tags       : ['api'],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The Template ID to be deleted')
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
                            }).label('Template')
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
