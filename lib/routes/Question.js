'use strict';

const Joi                  = require('joi');
const AuxFns               = require('../util/QuestionFunctions');
const Handler              = require('../util/QuestionHandlers');
const ErrorHandler         = require('../util/ErrorHandler');
const ResponseSchemas      = require('../schemas/200/GetQuestion');
const CreateQuestionSchema = require('../schemas/CreateQuestion');

module.exports = [
    {
        // Get Question
        method: 'GET',
        path  : '/question/{id}',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for Specific Question',
            notes      : 'Get the specified question',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getQuestion, assign: 'preVal' }
            ],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The Question ID to Search')
                },
                failAction: ErrorHandler
            },
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchemas.getQuestionSchema.label('Question')
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
        // Get All the Questions
        method: 'GET',
        path  : '/question',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for all the Questions',
            notes      : 'Get all the questions',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getQuestions, assign: 'preVal' }
            ],
            validate   : {
                failAction: ErrorHandler
            },
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchemas.getQuestionsSchema.label('Question')
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
        // Create Question
        method: 'POST',
        path  : `/question`,
        config: {
            handler: Handler.post,
            pre    : [
                { method: AuxFns.getQuestion, assign: 'preVal' }
            ],
            description: 'POST Endpoint for Specific Question',
            notes      : 'Create a Question',
            tags       : ['api'],
            validate   : {
                payload: {
                    question: CreateQuestionSchema
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
                            }).label('Question')
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
        // Modify Questions
        method: 'PUT',
        path  : `/question`,
        config: {
            handler: Handler.put,
            description: 'PUT Endpoint for Specific Questions',
            notes      : 'Edit the specifics questions',
            tags       : ['api'],
            validate   : {
                payload: {
                    questions: CreateQuestionSchema.CreateQuestionsSchema
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
                            }).label('Question')
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
        // Delete Question
        method: 'DELETE',
        path  : `/question/{id}`,
        config: {
            handler: Handler.delete,
            pre    : [
                { method: AuxFns.deleteQuestionPre, assign: 'preVal' }
            ],
            description: 'DELETE Endpoint for Specific Question',
            notes      : 'Delete the Specific Question',
            tags       : ['api'],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The ID of the question to be deleted')
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
                            }).label('Question')
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
