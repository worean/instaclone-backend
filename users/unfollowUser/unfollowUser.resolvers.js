import client from "../../client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils"

const fnUnFollowUser = async(_, {userName}, {logginedUser}) => {
    return {
        ok:false,
        error:"User does not exist."
    }
}
export default {
    Mutation: {
        unfollowUser : protectedResolver(fnUnFollowUser),

    },
};