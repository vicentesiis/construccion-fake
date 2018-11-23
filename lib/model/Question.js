'use strict';

const Mongoose = require('mongoose');

const Schema        = Mongoose.Schema;
const QuestionModel = new Schema({
    name    : { type: String, required: true },
    weighing: { type: Number, required: true },
    status  : { type: Number, required: true }
});

module.exports = Mongoose.model('Question', QuestionModel);
