'use strict';

const Joi = require('joi');

const getTemplateSubsections = Joi.array().items(Joi.object().keys({
    name  : Joi.string(),
    status: Joi.number().valid(0, 1, 2),
    areas : Joi.array().items(Joi.string())
}));
const getTemplateSections = Joi.array().items(Joi.object().keys({
    name       : Joi.string(),
    status     : Joi.number().valid(0, 1, 2),
    subsections: getTemplateSubsections
}));
const getTemplateSchema = Joi.object().keys({
    id      : Joi.string(),
    name    : Joi.string(),
    status  : Joi.number().valid(0, 1, 2),
    sections: getTemplateSections
});
const getTemplatesSchema = Joi.array().items(getTemplateSchema);

module.exports = {
    getTemplatesSchema,
    getTemplateSchema
};
