import client from "../../client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils"

const fnUnFollowUser = async (_, { userName }, { logginedUser }) => {
    const verified = await client.user.findUnique({ 
        where: { userName },
        select: {id:true}
    })
    if (!verified) {
        return {
            ok: false,
            error: "User does not exist."
        }
    }

    // 자기 자신은 언팔로우 하지 못 한다.
    if (userName === logginedUser.userName) {
        return {
            ok: false,
            error: "Cannot unFollow yourself."
        }
    }

    await client.user.update({
        where: {
            id: logginedUser.id
        },
        data: {
            following: {
                disconnect: {
                    userName,
                }
            }
        }
    })
    return {
        ok: true
    }
}
export default {
    Mutation: {
        unfollowUser: protectedResolver(fnUnFollowUser),
    },
};