'use strict';

const Graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = Graphql;

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    title: { type: GraphQLString },
  }),
});

module.exports = NoteType;
