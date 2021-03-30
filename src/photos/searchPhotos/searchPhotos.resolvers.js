import client from "../../client";

export default {
    Query : {
        searchPhotos: (_,{keyword, page}) => {
            return client.photo.findMany({
                where: {
                    caption : {
                        startsWith:keyword
                    }
                },
                take : 5,
                skip :page ? (page-1) * 5 : 0 
            })
        }
    }
}