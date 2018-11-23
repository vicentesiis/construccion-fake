'use strict';

const Joi = require('joi');

const CreateAreaSchema = Joi.object().keys({
    name     : Joi.string().required(),
    questions: Joi.array().items(Joi.string()).required(),
    status   : Joi.number().required()
});

module.exports = CreateAreaSchema;
