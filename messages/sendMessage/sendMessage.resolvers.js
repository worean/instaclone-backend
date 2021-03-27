import client from "../../client";
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
                newRoom = await client.room.create({
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
            await client.message.create({
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
            return {
                ok: true
            }
        }),
    },
}