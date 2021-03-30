import client from "../../client"
import { protectedResolver } from "../users.utils"

const fnFollowUser = async (_, { userName }, { logginedUser }) => {
    const verified = await client.user.findUnique({ where: { userName } });
    if (!verified) {
        return {
            ok: false,
            error: "User does not exist."
        }
    }
    // 자기 자신은 팔로우 하지 못 한다.
    if (userName === logginedUser.userName) {
        return {
            ok: false,
            error: "Cannot Follow yourself."
        }
    }

    // user를 업데이트 한다.
    await client.user.update({
        where: {
            id: logginedUser.id  // 로그인된 유저의 id를 가지고 table에서 선택한다.
        },
        data: {
            following: {
                connect: {
                    userName,
                }
            }
        }
    })
    return {
        ok: true,
    }
}


export default {
    Mutation: {
        followUser: protectedResolver(fnFollowUser),
    },
};