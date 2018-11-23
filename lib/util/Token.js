'use strict';

const JWT = require('jsonwebtoken');
const User  = require('../model/User');
const secret = require('../../server/config').jwtKey;

const validate = (async (decoded, request, cb) => {

    const user = await User.findOne({ 'email': decoded.email });

    if (!user)
        return { isValid: false };

    return { isValid: true };
});

const generateToken = (user) => {

    const secretKey = Buffer.from(secret).toString('base64');

    return JWT.sign({ email: user }, secretKey, { algorithm: 'HS256', expiresIn: '18h' });
};


module.exports = {
    validate,
    generateToken
};
