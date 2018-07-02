'use strict';

exports.up = (knex, Promise) => {

  return knex.schema
    .createTable('Users', (table) => {

      table.increments('id').primary();
      table.specificType('email', 'citext').notNullable().unique();
      table.binary('password');
      table.string('username').notNullable();
      table.binary('resetToken');
      table.timestamp('dateCreated');
      table.timestamp('dateUpdated');

    }).createTable('Tokens', (table) => {

      table.string('id').primary();
      table.integer('userId')
        .references('id')
        .inTable('Users')
        .onDelete('CASCADE');
      table.timestamp('dateCreated');
    });
};

exports.down = (knex, Promise) => {

  // this code gets run outside of lab's view, so doesn't get counted in coverage
  // $lab:coverage:off$
  return knex.schema.dropTable('Tokens')
    .dropTable('Users');
  // $lab:coverage:on$
};
