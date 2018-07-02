'use strict';

exports.seed = function (knex, Promise) {

  return knex('Users').then(() => {

    return Promise.all([
      // Inserts seed entries
      knex('Users').insert({ email: 'a@b.c', username: 'a' }),
      knex('Users').insert({ email: 'c@d.e', username: 'c' }),
      knex('Users').insert({ email: 'a@d.e', username: 'a' }),
      knex('Users').insert({ email: 'd@d.e', username: 'd' }),
      knex('Tokens').insert({ id: 99, userId: 1 }),
      knex('Tokens').insert({ id: 98, userId: 1 }),
      knex('Tokens').insert({ id: 97, userId: null }),
    ]);
  });
};
