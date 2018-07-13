'use strict';

const Joi = require('joi');


module.exports = (server, options) => {

  return [
    {
      method: 'GET',
      path: '/users/{id}',
      config: {
        description: 'Get a user',
        tags: ['api'],
        validate: {
          headers: Joi.object({
            authorization: Joi.string()
              .description('JWT'),
          }).unknown(),
          params: {
            id: Joi.number().integer().required(),
          },
        },
        auth: {
          strategy: 'api-user-jwt',
        },
      },
      handler: { tandy: {} },
    },
    {
      method: 'GET',
      path: '/user',
      config: {
        description: 'Get logged-in user',
        tags: ['api'],
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
      handler: { tandy: {} },
    },
    {
      method: 'GET',
      path: '/users',
      config: {
        description: 'Get all users',
        tags: ['api', 'user'],
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
      handler: { tandy: {} },
    },
    {
      method: 'PATCH',
      path: '/users/{id}',
      config: {
        description: 'Update a user',
        tags: ['api', 'user'],
        validate: {
          headers: Joi.object({
            authorization: Joi.string()
              .description('JWT'),
          }).unknown(),
          payload: {
          },
        },
        auth: {
          strategy: 'api-user-jwt',
        },
      },
      handler: { tandy: {} },
    },
    {
      method: 'DELETE',
      path: '/users/{id}',
      config: {
        description: 'Delete a user',
        tags: ['api'],
        validate: {
          headers: Joi.object({
            authorization: Joi.string()
              .description('JWT'),
          }).unknown(),
          params: {
            id: Joi.number().integer().required(),
          },
        },
        auth: {
          strategy: 'api-user-jwt',
        },
      },
      handler: { tandy: {} },
    },
  ];
};
