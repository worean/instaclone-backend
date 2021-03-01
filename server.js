import dotenv from 'dotenv'
dotenv.config()

import schema from './schema';
import { ApolloServer } from 'apollo-server';

const server = new ApolloServer({schema});

// The `listen` method launches a web server.

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });




