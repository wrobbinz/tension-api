'use strict';

const Joi = require('joi');

const internals = {};

module.exports = (server, options) => {

  return {
    method: 'POST',
    path: '/logout-all',
    config: {
      description: 'Log user out of all current sessions',
      tags: ['api', 'private'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string()
            .description('JWT'),
        }).unknown(),
      },
      auth: {
        strategy: 'api-user-jwt',
      },
    },
    handler: async (request, h) => {

      const Tokens = request.models().Tokens;

      const { userId } = request.auth.credentials;
      await Tokens.query().where({ userId }).delete();

      return h.response().code(200);
    },
  };
};
