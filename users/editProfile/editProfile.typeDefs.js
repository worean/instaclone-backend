import { gql } from "apollo-server-core";

export default gql`
    type EditProfileResult {
        ok:Boolean!
        token:String
        error:String
    }
    type Mutation {
        editProfile(
            firstName:String
            lastName:String
            userName:String
            email:String
            password:String
            bio:String
        ) : EditProfileResult!
    }
`;