import client from "../../client"

export default {
    // ToDo : pagination 구현 필요함
    Query: {
        searchUsers: async (_, {keyword}) => {
            const users = await client.user.findMany({
                where:{
                    userName: {
                        startsWith:keyword.toLowerCase()
                    }
                }
            })
            return users;
        }
    }
}