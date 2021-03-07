import dotenv from 'dotenv'
dotenv.config()

import {typeDefs, resolvers} from './schema';
import { ApolloServer } from 'apollo-server';
import { getUser } from './users/users.utils';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    return {
      logginedUser: await getUser(req.headers.token)
    };
  },
});

// The `listen` method launches a web server.
export
const PORT = process.env.PORT;

server
  .listen(PORT) 
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });




