'use strict';

const Mongoose = require('mongoose');

const Schema    = Mongoose.Schema;
const AreaModel = new Schema({
    name     : { type: String, required: true },
    questions: { type: Array, required: true },
    status   : { type: Number, required: true }
});

module.exports = Mongoose.model('Area', AreaModel);
