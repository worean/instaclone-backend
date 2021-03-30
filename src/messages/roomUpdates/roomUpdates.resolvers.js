import { subscribe } from "graphql"
import { withFilter } from "graphql-subscriptions"
import { NEW_MESSAGE } from "../../constant"
import { pubsub } from "../../pubsub"
import client from "../../client";

const FindRoom = async (id, logginedUser) => {
    const room = await client.room.findFirst({
        where: {
            id,
            users: {
                some: {
                    id: logginedUser.id
                }
            }
        },
        select: {
            id: true
        }
    });
    return room;
}
export default {
    Subscription: {
        roomUpdates: {
            subscribe: async (root, args,context,info) => {
                const room = await FindRoom(args.id, context.logginedUser.id)
                if (!room) {
                    throw new Error("You shall not see this.");
                }

                // 함수 호출을 넘겨주는 것이 아닌 함수 자체(정의)를 넘겨줘야한다.
                // 지속적으로 반환되는 Iterable을 가져와야 하기 때문에 그러함.
                return withFilter(
                    () => {
                        // NEW_MESSAGE 이벤트에 동작한다.
                        return pubsub.asyncIterator(NEW_MESSAGE)
                    },
                    // Subscription 이후에도 예외처리 가 따로 필요할 경우가 있기에 사용한다.
                    async ({roomUpdates}, { id }, {logginedUser}) => {
                        //if (roomUpdates.roomId === id) {
                            return await FindRoom(id,logginedUser) ?
                                true : false
                        //}
                    }
                    // 위의 4개의 매개변수를 가져와야한다.(필요한 것들만 가져와도 무방함)
                )(root, args, context);
            },
        },
    }
}