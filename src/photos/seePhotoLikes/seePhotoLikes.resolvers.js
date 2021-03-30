import client from "../../client"

export default {
    Query : {
        seePhotoLikes : async (_, {id}) => {
            const likes = await client.like.findMany({
                where:{
                    photoId:id
                },
                select : {      // select와 include는 동시에 사용 불가
                    user:true   // User 속성 만을 가져온다.
                }
            });
            // Array를 다시 설정한다. -> 안에 user 속성으로 가져오는 번거로움 제거
            return likes.map(like => like.user);
        }
    }
}