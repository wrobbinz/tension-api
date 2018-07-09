'use strict';

const Model = require('schwifty').Model;
const Joi = require('joi');

module.exports = class Notes extends Model {

  static get tableName() {

    return 'Notes';
  }

  static get joiSchema() {

    return Joi.object({
      id: Joi.number().integer().min(1),
      ownedBy: Joi.number().integer(),
      order: Joi.number().integer(),
      title: Joi.string().max(100),
      content: Joi.object(),
      tags: Joi.array().items(Joi.string()),
      isFavorite: Joi.boolean().allow(null),
      dateCreated: Joi.date().iso(),
      dateUpdated: Joi.date().iso(),
    });
  }

  static get relationMappings() {

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Users'),
        join: {
          from: 'Notes.ownedBy',
          to: 'Users.id',
        },
      },
    };
  }

  $beforeInsert() {

    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
  }
  $beforeUpdate() {

    this.dateUpdated = new Date().toISOString();
  }
};
