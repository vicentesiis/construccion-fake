'use strict';

const Area = require('../model/Area');

const getArea = (req, _res) => {

    const areaId = (Object.keys(req.params).length > 0) ? req.params.id : req.payload.area.id;

    return Area.findOne({ '_id': areaId }, (_err, _project) => {});
};

const getAreas = (_req, _res) => Area.find({}, (_err, _areas) => {});

const deleteAreaPre = (req, _res) => Area.findOne({ '_id': (Object.keys(req.params).length > 0) ? req.params.id : req.payload.id }, (_err, _user) => {});

module.exports = {
    getArea,
    getAreas,
    deleteAreaPre
};
