import { gql } from "apollo-server-core";

export default gql`
    type DeletePhotoResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        deletePhoto(id:Int!):DeletePhotoResult!
    }
`;