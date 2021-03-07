import fs, { createWriteStream } from 'fs'
import client from "../../client"
import bcrypt, { hash } from "bcrypt"
import { protectedResolver } from "../users.utils";
import { createMergedTypeResolver } from "@graphql-tools/stitch";

const fnEditProfile = async (_,
    { firstName, lastName, email, password: newPassword, userName, bio, avatar},
    { logginedUser }
) => {
    const {filename, createReadStream} = await avatar;
    
    // ReadStream을 가져온다.
    const readStream = createReadStream();

    // 쓰기 스트림을 특정 폴더와 파일로 옮긴다.
    const writeStream = createWriteStream(process.cwd() + "/uploads/" + filename);

    // 읽은 데이터를 writeStream으로 연결한다.(pipe)
    readStream.pipe(writeStream);

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

export default {
    Mutation: {
        editProfile: protectedResolver(fnEditProfile),
    },
}