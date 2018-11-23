'use strict';

const Mongoose = require('mongoose');

const Schema    = Mongoose.Schema;
const UserModel = new Schema({
    type     : { type: Number, required: true }, // 0 - gerente, 1 - Inspector, 2 - Intendente

    firstName: { type: String, required: true },
    lastName : { type: String, required: true },
    password : { type: String, required: true },
    scope    : { type: Array, required: true },
    email    : { type: String, required: true, index: { unique: true } },
    info     : { type: Object, required: false },
    messages : { type: String, required: false },                           // TODO change it to object
    token    : { type: String, required: false }
});

module.exports = Mongoose.model('User', UserModel);
