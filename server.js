import pkg from '@prisma/client'
const { PrismaClient } = pkg;
import { ApolloServer, gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const client = new PrismaClient()

// Type에 대한 스키마 설정
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Movie {
    id:Int!
    title: String!
    year: Int!

    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createMovie(title: String!, year:Int!, genre:String):Movie
    deleteMovie(id: Int!):Boolean,
    updateMovie(id:Int!, year:Int!):Boolean
  }

  #Query라는 type을 정의한다.
  type Query {
    movies: [Movie]
    movie:Movie
  }

`;

// 실제 정의된 데이터
// const movies = [
//     {
//       title: 'The King',
//       year: 1995,
//     },
//     {
//       title: 'High noon',
//       year: 1234,
//     },
//   ];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    movies: () => client.movie.findMany(), // movie테이블의 정보들을 모두 가져온다.
    movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),

    deleteMovie: (_, { id }) =>
      client.movie.delete({
        where: { id }
      }),
    updateMovie: (_, { id, year }) =>
      client.movie.update({
        where: { id }, data: { year }
      }),
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});




