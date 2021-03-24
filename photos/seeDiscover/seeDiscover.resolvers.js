import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default {
    Query :{
        seeDiscover : protectedResolver(async (_,{page}, {logginedUser}) => {
            const photos = await client.photo.findMany({
                where:{
                    // 내가 팔로우하지 않은 사람들의 게시물을 가져온다.
                    // 24시간 기준으로 검색해서 가져온다.
                },
                orderBy: {
                    // 생성된 일자를 기준으로 정렬한다.
                    createdAt:"desc"    
                },
                // 10개씩 표현한다.
                take : 10,
                skip: page ? (page-1) * 10 : 0
            });
            console.log(photos);
            return photos;
        }),
    }
}