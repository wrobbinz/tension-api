'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');

// Pull .env into process.env
if (process.env.NODE_ENV === 'test'){
  Dotenv.config({ path: `${__dirname}/.env-test` });
}
else {
  Dotenv.config({ path: `${__dirname}/.env` });
}

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['headers'],
      },
      validate: {
        failAction: (request, h, error) => {

          if (process.env.NODE_ENV === 'production') {
            // In prod, log a limited error message and throw the default Bad Request error.
            console.error('ValidationError:', error.message); // Better to use an actual logger here.

          } else {
            // During development, log and respond with the full error.
            console.error(error);
            throw error;
          }
        },
      },
    },
    debug: {
      $filter: 'NODE_ENV',
      development: {
        log: ['error', 'implementation', 'internal'],
        request: ['error', 'implementation', 'internal'],
      },
    },
  },
  register: {
    plugins: [
      {
        plugin: '../lib',
        options: {
          jwtKey: process.env.JWT_SECRET,
        },
        routes: {
          prefix: process.env.API_PREFIX,
        },
      },
      {
        plugin: './plugins/graphql',
      },
      {
        plugin: './plugins/swagger',
      },
      {
        plugin: 'schwifty',
        options: {
          $filter: 'NODE_ENV',
          $default: {},
          $base: {},
          development: {
            migrateOnStart: true,
            knex: {
              client: 'pg',
              useNullAsDefault: true,
              connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
              },
            },
          },
          test: {
            migrateOnStart: true,
            knex: {
              client: 'pg',
              useNullAsDefault: true,
              connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
              },
            },
          },
          production: {
            migrateOnStart: false,
          },
        },
      },
    ],
  },
});
