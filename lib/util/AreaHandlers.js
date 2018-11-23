'use strict';

const Boom = require('boom');
const Area = require('../model/Area');

const getById = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.notFound('The area you are searching for, does not exists');

    return req.pre.preVal;
};

const post = (req, res) => {

    if (req.pre.preVal)
        return Boom.badRequest('Area Already Exists');

    const area = new Area();

    area.name      = req.payload.area.name;
    area.questions = req.payload.area.questions;

    area.save((err, _area) => {

        if (err)
            return Boom.badRequest(err);

        return area;
    });

    return Object.assign({ 'code': 200, 'message': 'Area Successfully Created' });

};

const put = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No Area Found to Update');

    const areaId  = req.payload.id;
    const newData = req.payload.area;

    Area.findOneAndUpdate({ '_id': areaId }, newData, { upsert: true }, (err, doc) => {

        if (err)
            Boom.badRequest(err);
    });

    return Object.assign({ 'code': 200, 'message': 'Area Successfully Updated' });

};

const deleteFn = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No Area Found');

    const areaId = req.params.id;

    Area.findOneAndRemove({ '_id': areaId }, (err) => {

        if (err)
            return Boom.serverUnavailable('Problem While Deleting, Try Again Later');

    });

    return Object.assign({ 'code': 200, 'message': 'Area Successfully Deleted' });
};

module.exports = {
    get   : getById,
    post,
    put,
    delete: deleteFn
};
