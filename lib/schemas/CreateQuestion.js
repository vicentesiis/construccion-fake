'use strict';

const Joi = require('joi');

const CreateQuestionSchema = Joi.object().keys({
    name    : Joi.string().required(),
    weighing: Joi.number().required(),
    status  : Joi.number().required()
});
const CreateQuestionsSchema = Joi.array().items(Joi.object().keys({
    _id     : Joi.string().required(),
    name    : Joi.string().required(),
    weighing: Joi.number().required(),
    status  : Joi.number().required()
}));

module.exports = {
    CreateQuestionSchema,
    CreateQuestionsSchema
};
