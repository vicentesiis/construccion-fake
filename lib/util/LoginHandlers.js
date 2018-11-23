'use strict';
const Boom  = require('boom');
const Token = require('../util/Token').generateToken;

const post = (req, res) => {

    if (!req.pre.matches)
        return Boom.unauthorized('Incorrect Password or Username');

    return Object.assign({
        'code'   : 200,
        'message': 'Successfully Loged In',
        'token'  : Token(req.payload.username),
        'user'   : req.pre.matches
    });
};

module.exports = {
    post
};