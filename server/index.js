'use strict';

const Glue     = require('glue');
const dbUrl    = require('./config').mongoDBURI;
const Token    = require('../lib/util/Token');
const secret   = require('./config').jwtKey;
const Mongoose = require('mongoose');
const Manifest = require('./manifest');

exports.deployment = async (start) => {

    const manifest = Manifest.get('/', process.env);
    const server   = await Glue.compose(manifest, { relativeTo: __dirname });

    // Compiler.apply(new DashboardPlugin());

    const secretKey = Buffer.from(secret).toString('base64');
    server.auth.strategy('jwt', 'jwt',{
        key: secretKey,
        validate: Token.validate
    });

    server.auth.default('jwt');

    await server.initialize();

    if (!start)
        return server;

    Mongoose.connect(dbUrl, { 'useNewUrlParser': true }, (err) => {

        if (err)
            throw err;

        console.info(`Connected to Mongodb - ${dbUrl}`);

    });

    await server.start();

    console.info(`Server started at ${server.info.uri}`);

    return server;
};

if (!module.parent) {

    exports.deployment(true);

    process.on('unhandledRejection', (err) => {

        throw err;
    });
}
