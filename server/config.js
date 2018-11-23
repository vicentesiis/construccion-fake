'use strict';

const key        = 'thisisasecretkeythatshouldbemoresecret';
// const mongoDBURI = 'mongodb://constructionDev:Construction123@ds139921.mlab.com:39921/construction-dev';

const mongoDBURI = 'mongodb://localhost:27017/construccion';

module.exports = {
    jwtKey    : key,
    mongoDBURI
};
