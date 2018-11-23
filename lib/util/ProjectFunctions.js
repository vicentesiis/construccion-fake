'use strict';

const Project = require('../model/Project');

const getProject = (req, res) => {

    const Query = (Object.keys(req.params).length > 0 ? req.params.id : req.payload.project.name);

    let documentQuery = null;

    if (Object.keys(req.params).length > 0) {
        documentQuery = Project.findOne({ '_id': Query }, (_err, _project) => {});
    }
    else {
        documentQuery = Project.findOne({ 'name': Query }, (_err, _project) => {});
    }

    return documentQuery;
};

const getProjects = (req, res) => Project.find({}, (_err, _projects) => {});

const deleteProjectPre = (req, res) => Project.findOne({ '_id': (Object.keys(req.params).length) > 0 ? req.params.id : req.payload.id }, (_err, _user) => {});

module.exports = {
    getProject,
    getProjects,
    deleteProjectPre
};
