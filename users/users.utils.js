import jwt from "jsonwebtoken"
import client from "../client";

export const getUser = async (token) =>{
    const {id} = await jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await client.user.findUnique({where:{id}});
    if(user) {
        return user;
    }else{
        return null;
    }
}
export const protectedResolver = (ourResolver) => (root, args, context, info) => {
    if (!context.logginedUser) {
        console.log(context);
        return {
            ok: false,
            error: "User is not Loggined"
        }
    }
    return ourResolver(root, args, context, info);
}