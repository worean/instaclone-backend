import client from "../../client"

export default {
    Query : {
        seePhotoComments: async (_,{photoId}) => {
            // ToDo : Pagination 구현 필요함
            return await client.photo.findUnique({
                where:{
                    id:photoId
                }
            }).comments({
                orderBy: {
                    createdAt:"desc"
                }
            });
        }
    }
}