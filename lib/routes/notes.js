'use strict';

const Joi = require('joi');


module.exports = (server, options) => {

  return [
    {
      method: 'POST',
      path: '/users/{id}/notes',
      config: {
        description: 'Create a new note for a specified user',
        tags: ['api'],
        validate: {
          headers: Joi.object({
            authorization: Joi.string()
              .description('JWT'),
          }).unknown(),
          payload: {
            title: Joi.string(),
            content: Joi.object(),
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
      path: '/users/{id}/notes/{childId}',
      config: {
        description: 'Get a user\'s note',
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
      path: '/users/{id}/notes',
      config: {
        description: 'Get all notes',
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
      method: 'PATCH',
      path: '/notes/{id}',
      config: {
        description: 'Update an existing note',
        tags: ['api'],
        validate: {
          headers: Joi.object({
            authorization: Joi.string()
              .description('JWT'),
          }).unknown(),
          payload: {
            title: Joi.string(),
            content: Joi.object(),
            order: Joi.number().integer(),
            tags: Joi.array().items(Joi.number().integer()),
            isFavorite: Joi.boolean(),
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
      path: '/users/{id}/notes/{childId}',
      config: {
        description: 'Delete a note',
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
