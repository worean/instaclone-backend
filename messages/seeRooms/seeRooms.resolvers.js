import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        seeRooms:protectedResolver(async(_,__,{logginedUser}) => {
            return client.room.findMany({
                where: {
                    users:{
                        some: {
                            id: logginedUser.id
                        }
                    }
                }
            });
        }),
    },
}