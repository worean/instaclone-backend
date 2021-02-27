import { gql } from "apollo-server-core"

export default gql`
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