'use strict';

const Question = require('../model/Question');

const getQuestion = (req, res) => {

    const QuestionId = (Object.keys(req.params).length > 0) ? req.params.id : req.payload.question.id;

    return Question.findOne({ '_id': QuestionId }, (_err, _project) => {});
};

const getQuestions = (req, res) => Question.find({}, (_err, _questions) => {});

const deleteQuestionPre = (req, res) => Question.findOne({ '_id': (Object.keys(req.params).length > 0) ? req.params.id : req.payload.id }, (_err, _user) => {});

const getQuestionsByIds = (req, res) => {};

module.exports = {
    getQuestion,
    getQuestions,
    deleteQuestionPre,
    getQuestionsByIds
};
