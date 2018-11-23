'use strict';

const User   = require('../model/User');
const Bcrypt = require('bcryptjs');

const getUser = (req, res) => {

    const Query = (Object.keys(req.params).length > 0 ? req.params.id : req.payload.user.email);

    let documentQuery = null;

    if (Object.keys(req.params).length > 0) {
        documentQuery = User.findOne({ '_id': Query }, (_err, _project) => {});
    }
    else {
        documentQuery = User.findOne({ 'email': Query }, (_err, _project) => {});
    }

    return documentQuery;
};

const getUsers = (req, res) => User.find({}, (_err, _users) => {});

const deleteUserPre = (req, res) => User.findOne({ '_id': (Object.keys(req.params).length > 0 ? req.params.id : req.payload.id) }, (_err, _user) => {});

const generatePasswordHash = (password) => Bcrypt.hashSync(password, Bcrypt.genSaltSync(10));

module.exports = {
    getUser,
    getUsers,
    deleteUserPre,
    generatePasswordHash
};
