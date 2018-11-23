'use strict';

const Joi = require('joi');

const getQuestionSchema = Joi.object().keys({
    id      : Joi.string().required(),
    name    : Joi.string().required(),
    weighing: Joi.number().required(),
    status  : Joi.number().required()
});
const getQuestionsSchema = Joi.array().items(getQuestionSchema);

module.exports = {
    getQuestionSchema,
    getQuestionsSchema
};
