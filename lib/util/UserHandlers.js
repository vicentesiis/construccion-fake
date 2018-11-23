'use strict';

const Boom   = require('boom');
const User   = require('../model/User');
const AuxFns = require('./UserFunctions');

const get = (req, res) => {

    if (req.pre.preVal === null)
        return Boom.notFound('The username you are searching for, does not exists');

    return req.pre.preVal;

};

const post = (req, res) => {

    if (req.pre.preVal)
        throw Boom.badRequest('Email already taken');

    const user = new User();

    user.email     = req.payload.user.email;
    user.firstName = req.payload.user.firstName;
    user.lastName  = req.payload.user.lastName;
    user.type      = req.payload.user.type;
    user.password  = AuxFns.generatePasswordHash(req.payload.user.password);
    user.scope     = req.payload.user.scope;
    user.info      = req.payload.user.info;
    user.messages  = req.payload.user.messages;
    user.token     = req.payload.user.token;

    user.save(((err, doc) => {

        if (err)
            throw Boom.badRequest(err);

        return doc;
    }));

    return Object.assign( { 'code': 200, 'message': 'User Successfully Created' });
};

const put = (req, res) => {

    const data = req.payload.user;

    data.password = AuxFns.generatePasswordHash(req.payload.user.password);

    if (req.pre.preVal === null)
        throw Boom.badRequest('No user found');

    const userId  = req.payload.id;
    const newData = data;

    User.findOneAndUpdate({ '_id': userId }, newData, { upsert: true }, (err, _doc) => {

        if (err)
            Boom.badRequest(err);

    });

    return Object.assign({ 'code': 200, 'message': 'Successfully Updated' });

};

const deleteFn = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No user found');

    const userId = req.params.id;

    User.findOneAndRemove({ '_id': userId }, (err) => {

        if (err)
            throw Boom.serverUnavailable('Problem While Deleteing, Try Again Later');

    });

    return Object.assign({ 'code': 200, 'message': 'Successfully Deleted' });

};

module.exports = {
    get,
    post,
    put,
    delete: deleteFn
};
