'use strict';

const Mongoose = require('mongoose');

const Schema        = Mongoose.Schema;
const TemplateModel = new Schema({
    name    : { type: String, required: true },
    status  : { type: Number, required: true },
    sections: { type: Array, required: false }
});

module.exports = Mongoose.model('Template', TemplateModel);
