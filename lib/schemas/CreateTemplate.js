'use strict';

const Joi = require('joi');

const subsectionsSchema = Joi.array().items(Joi.object().keys({
    name  : Joi.string(),
    status: Joi.number().valid(0, 1, 2),
    areas : Joi.array().items(Joi.string())
}));
const sectionsSchema = Joi.array().items(Joi.object().keys({
    name       : Joi.string(),
    status     : Joi.number().valid(0, 1, 2),
    subsections: subsectionsSchema
}));
const CreateTemplateSchema = Joi.object().keys({
    name    : Joi.string().required(),
    status  : Joi.number().valid(0, 1, 2),
    sections: sectionsSchema
});

module.exports = CreateTemplateSchema;
