import { gql } from "apollo-server-core";

export default gql `
    type Query {
        seeDiscover(page:Int):[Photo]
    }
`;