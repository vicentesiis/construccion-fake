'use strict';

const Inert       = require('inert');
const Vision      = require('vision');
const Package     = require('../../../package.json');
const Handlebars  = require('handlebars');
const HapiSwagger = require('hapi-swagger');

module.exports = {
    name: 'app-swagger',
    async register(server) {

        const swaggerOptions = {
            documentationPage: false,
            validatorUrl     : null,
            info: {
                version: Package.version
            },
            securityDefinitions: {
                'jwt': {
                    'type': 'apiKey',
                    'name': 'Authorization',
                    'in': 'header'
                }
            },
            security: [{ 'jwt': [] }],
            host: process.env,host,
            schemes: [process.env.scheme]
        };

        await server.register([
            Inert,
            Vision,
            {
                plugin : HapiSwagger,
                options: swaggerOptions
            }
        ]);

        server.views({
            engines: { html: Handlebars },
            path   : __dirname
        });

        server.route({
            method : 'GET',
            path   : '/documentation',
            handler: {
                view: { template: 'swagger' }
            },
            config: { auth: false }
        });
    }
};
