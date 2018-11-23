'use strict';

const User   = require('../model/User');
const Bcrypt = require('bcryptjs');

const comparePassword = async (req, res) => {

    const userQuery = await User.findOne({ 'email': req.payload.username });
    if (userQuery) {
        const matches = await Bcrypt.compare(req.payload.password, userQuery.password);
        return matches ? userQuery : matches;
    }

    return false;
};

module.exports = {
    comparePassword
};
