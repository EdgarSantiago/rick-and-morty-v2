import 'server-only';
import { GraphQLClient } from 'graphql-request';

export const rmClient = new GraphQLClient('https://rickandmortyapi.com/graphql', {
  // Forward headers here if you ever need auth, locale, etc.
});

