import client from "../../client"
import bcrypt, { hash } from "bcrypt"
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        editProfile: protectedResolver(
            async (_,
                { firstName, lastName, email, password: newPassword, userName },
                { logginedUser }
            ) => {
                let hashedPW = null;
                if (newPassword) {
                    hashedPW = await bcrypt.hash(newPassword, 10);
                }
                const updateUser = await client.user.update({
                    where: {
                        id: logginedUser.id
                    },
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        ...(hashedPW && { password: hashedPW })
                    },
                });
                if (updateUser.id) {
                    return {
                        ok: true
                    }
                } else {
                    return {
                        ok: false,
                        error: "Could not Update Profile"
                    }
                }
            }
        ),
    },
}