'use strict';

const Joi = require('joi');

const CreateUserSchema = Joi.object({
    type     : Joi.number().required(),
    firstName: Joi.string().min(2).required(),
    lastName : Joi.string().min(2).required(),
    password : Joi.string().base64().required(),
    scope    : Joi.string().valid('ADMIN', 'SUPER_USER', 'NORMAL_USER').required(),
    email    : Joi.string().email().required(),
    info     : Joi.object().keys(
        {
            project          : Joi.string(),
            subdivisionLevels: Joi.array().items(Joi.number())
        }
    ),
    messages: Joi.string(),
    token   : Joi.string()
});

module.exports = CreateUserSchema;
