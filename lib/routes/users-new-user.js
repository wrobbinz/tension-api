'use strict';

const Boom = require('boom');
const Joi = require('joi');
const SecurePassword = require('secure-password');
const { wrapError: WrapError, UniqueViolationError } = require('db-errors');

// new instance of SecurePassword using the default config
const Pwd = new SecurePassword();

const internals = {};

module.exports = (server, options) => {

  return {
    method: 'POST',
    path: '/users',
    config: {
      description: 'Register new user',
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          username: Joi.string().required(),
          tree: Joi.object(),
        },
      },
      auth: false,
    },
    handler: async (request) => {

      const Users = request.models().Users;
      const Payload = request.payload;

      const userPassword = Buffer.from(Payload.password);
      const hash = Pwd.hashSync(userPassword);

      try {
        const user = await Users.query()
          .insertAndFetch({
            email: Payload.email,
            password: hash.toString('utf8'),
            username: Payload.username,
            tree: Payload.tree,
          });
        return user;
      }
      catch (error) {
        const dbErr = WrapError(error);
        if (dbErr instanceof UniqueViolationError) {
          return Boom.badRequest('Duplicate email');
        }
        return error;
      }
    },
  };
};
