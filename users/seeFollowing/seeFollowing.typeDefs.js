import { gql } from "apollo-server-core"

export default gql`

    type SeeFollowingQuery {
        ok:Boolean!,
        error:String,
        following:[User],
    },
    type Query {
        seeFollowing(userName:String!, cursor:Int!) : SeeFollowingQuery!
    }
`;