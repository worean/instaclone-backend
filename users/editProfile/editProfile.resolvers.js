import fs, { createWriteStream } from 'fs'
import client from "../../client"
import bcrypt, { hash } from "bcrypt"
import { protectedResolver } from "../users.utils";
import { createMergedTypeResolver } from "@graphql-tools/stitch";
import { uploadS3Server } from '../../shared/shared.utils';

const fnEditProfile = async (_,
    { firstName, lastName, email, password: newPassword, userName, bio, avatar},
    { logginedUser }
) => {
    let avatar_url = null;
    if(avatar) {
        avatar_url = await uploadS3Server(avatar, logginedUser.id, "avatars");
    }

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
            bio,
            ...(hashedPW && { password: hashedPW }),
            ...(avatar_url&& {avatar:avatar_url})
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

export default {
    Mutation: {
        editProfile: protectedResolver(fnEditProfile),
    },
}