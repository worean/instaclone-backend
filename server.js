import _schema from './schema';
import { ApolloServer } from 'apollo-server';

const server = new ApolloServer({_schema});

// The `listen` method launches a web server.
server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });




