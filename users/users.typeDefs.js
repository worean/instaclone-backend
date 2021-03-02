import { gql } from "apollo-server-core"

export default gql`
    type User {
        id:Int!
        firstName:String!
        lastName:String
        userName:String!
        email:String!

        createdAt:String!
        updatedAt:String!
    }
    # type EditProfile {
    #     ok:Boolean!
    #     token:String
    #     error:String
    # }
    # type Mutation {
    #     createAccount(
    #         firstName:String!
    #         lastName:String
    #         userName:String!
    #         email:String!
    #         password:String!
    #     ) : User
    #     login(
    #         userName:String!
    #         password:String!
    #     ) : LoginResult!
    #     editUserProfile(
    #         firstName:String
    #         lastName:String
    #         userName:String
    #         email:String
    #         password:String
    #     ) : User
    # }
    # type Query {
    #     seeProfile(userName:String!) : User
    # }
`;