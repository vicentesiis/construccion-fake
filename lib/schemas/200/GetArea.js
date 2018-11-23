'use strict';

const Joi = require('joi');

const getAreaSchema = Joi.object().keys({
    id       : Joi.string().required(),
    name     : Joi.string().required(),
    questions: Joi.array().items(Joi.string()).required(),
    status   : Joi.number().required()
});
const getAreasSchema = Joi.array().items(getAreaSchema);

module.exports = {
    getAreaSchema,
    getAreasSchema
};
