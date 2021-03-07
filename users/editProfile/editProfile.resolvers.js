import fs, { createWriteStream } from 'fs'
import client from "../../client"
import bcrypt, { hash } from "bcrypt"
import { protectedResolver } from "../users.utils";
import { createMergedTypeResolver } from "@graphql-tools/stitch";

const fnEditProfile = async (_,
    { firstName, lastName, email, password: newPassword, userName, bio, avatar},
    { logginedUser }
) => {
    let avatar_url = null;
    if(avatar) {
        const {filename, createReadStream} = await avatar;
        const newFilename = `${logginedUser.id}-${Date.now()}-${filename}`;
        // ReadStream을 가져온다.
        const readStream = createReadStream();
    
        // 쓰기 스트림을 특정 폴더와 파일로 옮긴다. -> 파일이름은 id + 시간 + 파일이름 으로 설정된다.(중복방지)
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
    
        // 읽은 데이터를 writeStream으로 연결한다.(pipe)
        readStream.pipe(writeStream);

        // url을 저장한다.
        avatar_url = `http://localhost:4000/static/${newFilename}`;
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