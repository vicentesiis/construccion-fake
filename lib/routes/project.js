'use strict';

const Joi                 = require('joi');
const AuxFns              = require('../util/ProjectFunctions');
const Handler             = require('../util/ProjectHandlers');
const ErrorHandler     = require('../util/ErrorHandler');
const ResponseSchema      = require('../schemas/200/GetProject');
const CreateProjectSchema = require('../schemas/CreateProject');

module.exports = [
    {
        // Get project
        method: 'GET',
        path  : '/project/{id}',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for Specific Project',
            notes      : 'Get the specified project',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getProject, assign: 'preVal' }
            ],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The Project ID to Search')
                },
                failAction: ErrorHandler
            },
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchema.getProjectSchema.label('Project')
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
        // Get All the projects
        method: 'GET',
        path  : '/project',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for all the Projects',
            notes      : 'Get all the projects',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getProjects, assign: 'preVal' }
            ],
            validate   : {
                failAction: ErrorHandler
            },
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchema.getProjectsSchema.label('Project')
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
        // Create Project
        method: 'POST',
        path  : `/project`,
        config: {
            handler: Handler.post,
            pre    : [
                { method: AuxFns.getProject, assign: 'preVal' }
            ],
            description: 'POST Endpoint for Specific Project',
            notes      : 'Create a Project',
            tags       : ['api'],
            validate   : {
                payload: {
                    project: CreateProjectSchema
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
                            }).label('Project')
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
        path  : `/project`,
        config: {
            handler: Handler.put,
            pre    : [
                { method: AuxFns.deleteProjectPre, assign: 'preVal' }
            ],
            description: 'PUT Endpoint for Specific Project',
            notes      : 'Edit the specific project',
            tags       : ['api'],
            validate   : {
                payload: {
                    id: Joi.string()
                        .required()
                        .description('The project ID for the Project needed to be edited'),
                    project: CreateProjectSchema
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
                            }).label('Project')
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
        path  : `/project/{id}`,
        config: {
            handler: Handler.delete,
            pre    : [
                { method: AuxFns.deleteProjectPre, assign: 'preVal' }
            ],
            description: 'DELETE Endpoint for Specific Project',
            notes      : 'Delete the Specific Project',
            tags       : ['api'],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The project ID for the Project to be deleted')
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
                            }).label('Project')
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
