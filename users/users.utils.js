import jwt from "jsonwebtoken"
import client from "../client";

export const getUser = async (token) => {
    if (!token)
        return null;
    const { id } = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
        return user;
    } else {
        return null;
    }
}
export const protectedResolver = (ourResolver) => (root, args, context, info) => {
    if (!context.logginedUser) {
        return {
            ok: false,
            error: "User is not Loggined"
        }
    }
    return ourResolver(root, args, context, info);
}