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
    // Info 에서 호출 동작 유형을 찾는다.
    const query = info.operation.operation === "query";
    if (!context.logginedUser) {
      if (query) {      // Query 항목일 때 보호
        return null;
      }
      return {
        ok: false,
        error: "User is not Loggined",
      };
    }
    return ourResolver(root, args, context, info);
}