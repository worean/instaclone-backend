import { gql } from "apollo-server-core"

export default gql`
    type Photo {
        id:Int!
        user:User!
        file:String!
        caption:String
        hashtags:[Hashtag]
        comments:Int!
        likes:Int!
        isMine:Boolean!
        createdAt:String!
        updatedAt:String!
    },
    type Hashtag {
        id:Int!
        hashtag:String!
        photos(page:Int):[Photo]
        totalPhotos:Int
        createdAt:String!
        updatedAt:String!
    },
    type Like {
        id:Int!
        photo:Photo!
        createdAt:String!
        updatedAt:String!
    }
`;