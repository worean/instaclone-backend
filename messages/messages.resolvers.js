import client from "../client";

export default {
    Room : {
        users : ({id}) => client.room.findUnique({where:{id}}).users(),
        messages : ({id}) => client.message.findMany({
            where: {
                roomId: id,
            }
        }),
        unreadTotal: ({ id }, _, { logginedUser }) => {
            if (!logginedUser)
                return 0;
            return client.message.count({
                where: {
                    read: false,
                    roomId: id,
                    userId: {
                        not: logginedUser.id
                    },
                    // user: {
                    //     id:{
                    //         not: logginedUser.id
                    //     }
                    // }
                }
            });
        },
    },
    Message : {
        user : ({id}) => client.message.findUnique({where:{id}}).user()
    }

}