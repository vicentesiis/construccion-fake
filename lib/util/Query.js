'use strict';

const Area     = require('../model/Area');
const Template = require('../model/Template');
const Project  = require('../model/Project');

/**
 * Returns the query promise
 * @param { Error } err
 * @param { Query } data
 * @returns { Promise } data
 */
const callback = (err, data) => {

    if (err)
        console.error(err);

    return data;
};

/**
 * Look for one Area with the question needed
 * @param { string } questionId
 * @returns { Function } function
 */
const area = (questionId) => Area.findOne({ 'questions': questionId }, callback);

/**
 * Look for one Template with the area needed
 * @param { string } areaId
 * @returns { Function } function
 */
const template = (areaId) => Template.findOne({ 'sections.subsections.areas': areaId }, callback);

/**
 * Look for one Project with the template needed
 * @param { string } templateId
 * @returns { Function } function
 */
const project = (templateId) => Project.findOne({ 'subdivisions.subdivisionDepartments.subdivisionDepartmentsInfo.templates': templateId }, callback);

module.exports = {
    area,
    template,
    project
};
