'use strict';

const Template = require('../model/Template');

const getTemplate = (req, res) => {

    const Query = (Object.keys(req.params).length > 0 ? req.params.id : req.payload.template.name);

    let documentQuery = null;

    if (Object.keys(req.params).length > 0) {
        documentQuery = Template.findOne({ '_id': Query }, (_err, _user) => {});
    }
    else {
        documentQuery = Template.findOne({ 'name': Query }, (_err, _user) => {});
    }

    return documentQuery;
};

const getTemplates = (req, res) => Template.find({}, (_err, _templates) => {});

const deleteTemplatePre = (req, res) => Template.findOne({ '_id': (Object.keys(req.params).length) > 0 ? req.params.id : req.payload.id }, (_err, _user) => {});

module.exports = {
    getTemplates,
    getTemplate,
    deleteTemplatePre
};
