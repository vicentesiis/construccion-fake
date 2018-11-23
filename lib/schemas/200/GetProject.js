'use strict';

const Joi = require('joi');

const getProjectSchema = Joi.object().keys({
    id          : Joi.string(),
    name        : Joi.string().required(),
    type        : Joi.number().required(),
    inspector   : Joi.string().optional().allow(null).default(null),
    supervisor  : Joi.string().optional().allow(null).default(null),
    subdivisions: Joi.array().items(Joi.object().keys({
        name    : Joi.string().required(),
        inspector : Joi.string().optional().allow(null).default(null),
        supervisor: Joi.string().optional().allow(null).default(null),
        subdivisionDepartments: Joi.array().items(Joi.object().keys({
            number    : Joi.number().required(),
            inspector : Joi.string().optional().allow(null).default(null),
            supervisor: Joi.string().optional().allow(null).default(null),
            subdivisionDepartmentsInfo: Joi.array().items(Joi.object().keys({
                name     : Joi.string().required(),
                type     : Joi.string().required(),
                templates: Joi.array().items(Joi.string()).required()
            }))
        }))
    }))
});
const getProjectsSchema = Joi.array().items(getProjectSchema);

module.exports = {
    getProjectsSchema,
    getProjectSchema
};
