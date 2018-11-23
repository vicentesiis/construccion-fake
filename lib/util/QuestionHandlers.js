'use strict';

const Boom     = require('boom');
const Query    = require('./Query');
const Update   = require('./Update');
const Verify   = require('./Verify');
const Question = require('../model/Question');

const getById = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.notFound('The question you are searching for, does not exists');

    return req.pre.preVal;

};

const post = (req, res) => {

    if (req.pre.preVal)
        return Boom.badRequest('Question Already Exists');

    const question = new Question();

    question.name     = req.payload.question.name;
    question.weighing = req.payload.question.weighing;
    question.status   = req.payload.question.status;

    question.save((err, doc) => {

        if (err)
            return Boom.badRequest(err);

        return doc;

    });

    return Object.assign({ 'code': 200, 'message': 'Question Successfully Created' });

};

/**
 * Handler for the PUT request for the Questions
 * @param { Object } req
 * @param { Object } res
 * @returns { Object } response
 */
const put = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No Question Found to Update');

    const NewQuestions = req.payload.questions;
    
    NewQuestions.map((_value, index) => {

        Question.findByIdAndUpdate({ '_id': NewQuestions[index]._id }, NewQuestions[index], { upsert: true }, (async (err, doc) => {

            if (err)
                return Boom.badRequest(err);

            const Area = await Query.area(NewQuestions[index]._id);

            if (Area) {
                const Template = await Query.template(Area.id);

                if (Template) {
                    await Update.project(
                        'subdivisions.subdivisionDepartments.subdivisionDepartmentsInfo.templates',
                        Template.id,
                        '$set',
                        'subdivisions.$[].subdivisionDepartments.$[].subdivisionDepartmentsInfo.$[].lastTemplate',
                        Template.id
                    );
                }
                Verify.areaStatus(Area);
            }
        }));
    });

    return Object.assign({ 'code': 200, 'message': 'Question Successfully Updated' });

};

const deleteFn = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No Question Found');

    const questionId = req.params.id;

    Question.findOneAndRemove({ '_id': questionId }, (err) => {

        if (err)
            return Boom.serverUnavailable('Problem While Deleting, Try Again Later');

    });

    return Object.assign({ 'code': 200, 'message': 'Question Successfully Deleted' });

};

module.exports = {
    get   : getById,
    post,
    put,
    delete: deleteFn
};
