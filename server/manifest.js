'use strict';

const Dotenv     = require('dotenv');
const Confidence = require('confidence');
const Toys       = require('toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        address: '0.0.0.0',
        host   : 'localhost',
        port   : process.env.PORT || 3000,
        debug  : {
            $filter    : 'NODE_ENV',
            development: {  
                log    : ['error', 'implementation', 'internal'],
                request: ['error', 'implementation', 'internal']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin : '../lib',   // Main plugin
                options: {}
            },
            {
                plugin: {
                    $filter   : 'NODE_ENV',
                    $default  : 'hpal-debug',
                    production: Toys.noop
                }
            },
            {
                plugin: './plugins/swagger'
            },
            {
                plugin: 'hapi-auth-jwt2',  options: {  select: ['io']  }
            },
            {
                plugin: 'good',
                options: {
                    reporters: {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ response: '*', log: '*' }]
                            },
                            { module: 'good-console' },
                            'stdout'
                        ]
                    }
                }
            }
        ]
    }
});
