import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        readMessage: protectedResolver(async (_, { id }, { logginedUser }) => {
            const message = await client.message.findFirst({
                where: {
                    id,
                    userId :{
                        not:logginedUser.id
                    },
                    room : {
                        users : {
                            some: {
                                id:logginedUser.id
                            }
                        }
                    }
                },
                select:{
                    id:true
                }
            });
            if(!message) {
                return {
                    ok:false,
                    error:"Message is not Found"
                }
            }
            await client.message.update({
                where:{
                    id
                },
                data : {
                    read:true
                }
            });
            return {
                ok:true
            }
        }),
    },
}