import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        seeRoom: protectedResolver(async (_, { id }, { logginedUser }) => {
            return client.room.findFirst({
                where: {
                    id,
                    users : {
                        id : logginedUser.id
                    }
                },
            });
        }),
    },
}