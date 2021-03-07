require("dotenv").config();
import express from "express";
import logger from "morgan";
import { typeDefs, resolvers } from './schema';
import { ApolloServer } from 'apollo-server-express';
import { getUser } from './users/users.utils';

const PORT = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      logginedUser: await getUser(req.headers.token)
    };
  },
});

const app = express();
server.applyMiddleware({ app });
app.use(logger("tiny"));
// 서버에 uploads 폴더를 올린다.
app.use(express.static("uploads"));
app.listen({ port: PORT }, () => {
    console.log(`🚀  Server is running on http://localhost:${PORT}/graphql`);
  });




