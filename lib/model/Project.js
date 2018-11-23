'use strict';

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const ProjectModel = new Schema({
    name        : { type: String, required: true },
    type        : { type: Number, required: true }, // 0 Horizontal; 1 Vertical
    inspector   : { type: String },
    supervisor  : { type: String },
    subdivisions: { type: Array, required: true }
});

module.exports = Mongoose.model('Project', ProjectModel);
