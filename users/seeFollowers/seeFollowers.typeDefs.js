import { gql } from "apollo-server-core"

export default gql`

    type SeeFollowersQuery {
        ok:Boolean!,
        followers:[User],
        totalPages:Int
    },
    type Query {
        seeFollowers(userName:String!, page:Int!) : SeeFollowersQuery!
    }
`;