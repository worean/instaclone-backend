import client from "../client"
import bcrypt from "bcrypt"
export default {
    Mutation: {
        createAccount: async (_,{
            firstName,
            lastName,
            userName,
            email,
            password
        }) => {
            // DB에 이미 userName과 email이 존재하는 지 체크한다.
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                userName,
                            },
                            {
                                email
                            },
                        ],
                    },
                });
                if(existingUser) {
                    throw new Error("This userName/email is already taken")
                }
                // hash Password -> 패스워드를 해싱하여 암호화한다.
                const hashedPW = await bcrypt.hash(password,10);            
                // 저장 및 유저 객체를 반환한다.
                return client.user.create({
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        password: hashedPW
                    }
                });
            } catch (e) {
                console.log(e)
                return e;
            }
        }
    },
};