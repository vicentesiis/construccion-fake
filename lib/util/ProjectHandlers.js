'use strict';

const Boom    = require('boom');
const Project = require('../model/Project');

const getByName = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.notFound('The project you are searching for, does not exists');

    return req.pre.preVal;
};

const post = (req, res) => {

    if (req.pre.preVal)
        return Boom.badRequest('Project Name Already Taken');

    const project = new Project();

    project.name         = req.payload.project.name;
    project.type         = req.payload.project.type;
    project.supervisor   = req.payload.project.supervisor;
    project.inspector    = req.payload.project.inspector;
    project.subdivisions = req.payload.project.subdivisions;

    project.save((err, doc) => {

        if (err)
            throw Boom.badRequest(err);

        return doc;
    });

    return Object.assign({ 'code': 200, 'message': 'Project Successfully Created' });
};

const put = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No Project Found to Update');

    const projectId = req.payload.id;
    const newData   = req.payload.project;

    Project.findOneAndUpdate({ '_id': projectId }, newData, { upsert: true }, (err, _doc) => {

        if (err)
            Boom.badRequest(err);

    });

    return Object.assign({ 'code': 200, 'message': 'Project Successfully Updated' });
};

const deleteFn = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No Project Found');

    const projectId = req.params.id;

    Project.findOneAndRemove({ '_id': projectId }, (err) => {

        if (err)
            throw Boom.serverUnavailable('Problem While Deleting, Try Again Later');

    });

    return Object.assign({ 'code': 200, 'message': 'Successfully Deleted' });

};

module.exports = {
    get   : getByName,
    post,
    put,
    delete: deleteFn
};
