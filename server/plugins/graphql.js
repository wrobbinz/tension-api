'use strict';
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const GraphqlSchema = require('../../lib/graphql/schema');
const Package = require('../../package.json');


module.exports = {
  name: 'app-graphql',
  async register(server) {

    await server.register([
      {
        plugin: graphqlHapi,
        options: {
          path: '/graphql',
          graphqlOptions: {
            schema: GraphqlSchema,
          },
          route: {
            cors: true,
          },
          info: {
            version: Package.version,
          },
        },
      },
    ]);

    await server.register({
      plugin: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql',
        },
        route: {
          cors: true,
        },
      },
    });
  },
};
