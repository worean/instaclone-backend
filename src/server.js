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
  context: async (ctx) => {
    if(ctx.req) {
      return {
        logginedUser: await getUser(ctx.req.headers.token)
      };
    } else {
      // ws 는 request 대신 connection을 쓴다.
      return {
        logginedUser: ctx.connection.context.logginedUser
      }
    }
  },
  subscriptions: {
    // request Header의 내용을 가져온다.
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.")
      }
      const logginedUser = await getUser(token);
      return {
        logginedUser
      }
    }
  }
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




