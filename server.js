import dotenv from 'dotenv'
dotenv.config()

import schema from './schema';
import { ApolloServer } from 'apollo-server';
import { getUser } from './users/users.utils';

const server = new ApolloServer({
  schema,
  context: async ({req}) => {
    return {
      logginedUser: await getUser(req.headers.jwt_token)
    }
  }
});

// The `listen` method launches a web server.

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });




