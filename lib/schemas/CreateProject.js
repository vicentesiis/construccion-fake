'use strict';

const Joi = require('joi');

const subdivisionDepartmentsInfoSchema = Joi.array().items(Joi.object().keys({
    name     : Joi.string().required(),
    type     : Joi.number().required(),
    templates: Joi.array().items(Joi.string()).required()
}));
const subdivisionDepartmentsSchema = Joi.array().items(Joi.object().keys({
    number    : Joi.number().required(),
    inspector : Joi.string().optional().allow(null).default(null),
    supervisor: Joi.string().optional().allow(null).default(null),
    subdivisionDepartmentsInfo: subdivisionDepartmentsInfoSchema
}));
const projectSubdivisionsSchema = Joi.array().items(Joi.object().keys({
    name      : Joi.string().required(),
    inspector : Joi.string().optional().allow(null).default(null),
    supervisor: Joi.string().optional().allow(null).default(null),
    subdivisionDepartments: subdivisionDepartmentsSchema
}));
const CreateProjectSchema = Joi.object({
    name      : Joi.string().required(),
    type      : Joi.string().required(),
    inspector : Joi.string().optional().allow(null).default(null),
    supervisor: Joi.string().optional().allow(null).default(null),
    subdivisions: projectSubdivisionsSchema
});

module.exports = CreateProjectSchema;
