require("dotenv").config();
import http from "http"
import express from "express";
import logger from "morgan";
import { typeDefs, resolvers } from './schema';
import { ApolloServer } from 'apollo-server-express';
import { getUser } from './users/users.utils';
import { pubsub } from "./pubsub";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if(req) {
      return {
        logginedUser: await getUser(req.headers.token)
      };
    }
  },
});

const app = express();
server.applyMiddleware({ app });
app.use(logger("tiny"));
app.use(express.static("uploads"));

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// 서버에 uploads 폴더를 올린다.
httpServer.listen({ port: PORT }, () => {
    console.log(`🚀  Server is running on http://localhost:${PORT}/graphql`);
  });




