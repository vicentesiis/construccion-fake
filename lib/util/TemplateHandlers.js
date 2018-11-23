'use strict';

const Boom     = require('boom');
const Template = require('../model/Template');

const getByName = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.notFound('The template you are searching for, does not exists');

    return req.pre.preVal;

};

const post = (req, res) => {

    if (req.pre.preVal)
        return Boom.badRequest('Template Name Already Taken');

    const template = new Template();

    template.name     = req.payload.template.name;
    template.status   = req.payload.template.status;
    template.sections = req.payload.template.sections;

    template.save((err, doc) => {

        if (err)
            throw Boom.badRequest(err);

        return doc;
    });

    return Object.assign({ 'code': 200, 'message': 'Template Successfully Created' });

};

const put = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No Template Found to Update');

    const templateId = req.payload.id;
    const newData = req.payload.template;

    Template.findOneAndUpdate({ '_id': templateId }, newData, { upsert: true }, (err, _doc) => {

        if (err)
            Boom.badRequest(err);

    });

    return Object.assign({ 'code': 200, 'message': 'Template Successfully Updated' });

};

const deleteFn = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No Template Found');

    const templateId = req.params.id;

    Template.findOneAndRemove({ '_id': templateId }, (err) => {

        if (err)
            return Boom.serverUnavailable('Problem While Deleting, Try Again Later');

    });

    return Object.assign({ 'code': 200, 'message': 'Template Successfully Deleted' });

};

module.exports = {
    get   : getByName,
    post,
    put,
    delete: deleteFn
};
