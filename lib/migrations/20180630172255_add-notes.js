'use strict';

exports.up = (knex, Promise) => {

  return knex.schema
    .createTable('Notes', (table) => {

      table.increments('id').primary();
      table.integer('ownedBy')
        .references('id')
        .inTable('Users')
        .onDelete('CASCADE')
        .notNullable();
      table.integer('order');
      table.string('title');
      table.specificType('content', 'jsonb');
      table.specificType('tags', 'jsonb[]');
      table.boolean('isFavorite');
      table.timestamp('dateCreated');
      table.timestamp('dateUpdated');
    });
};

exports.down = (knex, Promise) => {

  return knex.schema.dropTable('Notes');
};
