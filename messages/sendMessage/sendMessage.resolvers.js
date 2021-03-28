import client from "../../client";
import { NEW_MESSAGE } from "../../constant";
import { pubsub } from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        sendMessage: protectedResolver(async (_, { payload, roomId, userId }, { logginedUser }) => {
            let room = null;
            if (userId) {
                const user = await client.user.findUnique({
                    where: {
                        id: userId
                    },
                    select: {
                        id: true
                    }
                });
                if (!user) {
                    return {
                        ok: false,
                        error: "User is not exist."
                    };
                }
                room = await client.room.create({
                    data: {
                        users: {
                            connect: [
                                {
                                    id: userId
                                },
                                {
                                    id: logginedUser.id
                                }
                            ]
                        }
                    }
                });

            } else if (roomId) {
                room = await client.room.findUnique({
                    where: {
                        id: roomId
                    }
                });
                if (!room) {
                    return {
                        ok: false,
                        error: "Room is not Found"
                    }
                }
            }
            const newMessage = await client.message.create({
                data: {
                    payload,
                    room: {
                        connect: {
                            id: room.id
                        }
                    },
                    user: {
                        connect: {
                            id: logginedUser.id
                        }
                    }
                }
            });
            // NEW_MESSAGE를 PUBLISH 한다.
            pubsub.publish(NEW_MESSAGE,{roomUpdates : newMessage});
            return {
                ok: true
            }
        }),
    },
}