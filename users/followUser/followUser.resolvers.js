import client from "../../client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils"

const fnFollowUser = async(_, {userName}, {logginedUser}) => {
    const verified = await client.user.findFirst({where:{userName}});
    if(verified)
    {
        // user를 업데이트 한다.
        if(userName === logginedUser.userName) {
            return {
                ok:false,
                error:"Cannot Follow yourself."
            }
        }

        await client.user.update({
            where: {
                id:logginedUser.id  // 로그인된 유저의 id를 가지고 table에서 선택한다.
            },
            data : {
                following : {
                    connect : {
                        userName,
                    }
                }
            }
        })
        return {
            ok :true,
            
        }
    }
    return {
        ok:false,
        error:"User does not exist."
    }
}
export default {
    Mutation: {
        followUser : protectedResolver(fnFollowUser),

    },
};