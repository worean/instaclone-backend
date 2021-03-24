import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        // 내가 팔로우된 사람들과 내 게시물(Photo)를 가져오는 Query
        seeFeed:protectedResolver(async(_,__,{logginedUser}) => {
            return await client.photo.findMany({
                where: {
                    OR : [
                        // Follwer들의 Post를 가져온다.
                        {
                            user:{
                                followers : {
                                    some: {
                                        id:logginedUser.id  // 자신을 
                                    }
                                }
                            }
                        },
                        // 자기자신의 Post를 가져온다.
                        {
                            userId :logginedUser.id
                        }
                        // 중복된다면 1개만 가져온다.
                    ]
                    
                },
                orderBy : {
                    createdAt:"desc"    // 내림차순
                }
            })
        }),
    }
}