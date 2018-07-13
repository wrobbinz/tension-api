'use strict';

const Model = require('schwifty').Model;
const Joi = require('joi');

module.exports = class Users extends Model {

  static get tableName() {

    return 'Users';
  }

  static get jsonAttributes() {

    return [];
  }

  static get joiSchema() {

    return Joi.object({
      id: Joi.number().integer().min(1),
      email: Joi.string().email(),
      password: Joi.binary().allow(null),
      username: Joi.string(),
      resetToken: Joi.binary().allow(null),
      dateCreated: Joi.date().iso(),
      dateUpdated: Joi.date().iso(),
    });
  }

  static get relationMappings() {

    return {
      tokens: {
        relation: Model.HasManyRelation,
        modelClass: require('./Tokens'),
        join: {
          from: 'Users.id',
          to: 'Tokens.userId',
        },
      },
      notes: {
        relation: Model.HasManyRelation,
        modelClass: require('./Notes'),
        join: {
          from: 'Users.id',
          to: 'Notes.ownedBy',
        },
      },
    };
  }

  $formatJson(json) {

    json = super.$formatJson(json);

    delete json.password;
    delete json.resetToken;

    return json;
  }

  $parseDatabaseJson(json) {

    json = super.$parseDatabaseJson(json);
    return json;
  }

  $beforeInsert() {

    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
  }
  $beforeUpdate() {

    this.dateUpdated = new Date().toISOString();
  }
};
