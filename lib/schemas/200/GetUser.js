'use strict';

const Joi = require('joi');

const infoSchema = Joi.object().keys({
    project          : Joi.string(),
    subdivisionLevels: Joi.array().items(Joi.number())
});
const getUserSchema = Joi.object().keys({
    id       : Joi.string(),
    type     : Joi.number(),
    firstName: Joi.string(),
    lastName : Joi.string(),
    password : Joi.string().base64(),
    scope    : Joi.array().items(Joi.string().valid('ADMIN', 'SUPER_USER', 'NORMAL_USER')),
    email    : Joi.string().email(),
    info     : infoSchema,
    messages : Joi.string(),
    token    : Joi.string()
});
const getUsersSchema = Joi.array().items(getUserSchema);

module.exports = {
    getUsersSchema,
    getUserSchema
};
