import client from "../../client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export default {
    Mutation: {
        login : async (_,{userName,password}) => {
            //유저를 userName을 이용해서 찾는다.
            const user = await client.user.findUnique({where:{userName}});
            if(!user) {
                return {
                    ok:false,
                    error:"Account is not founded"
                }
            }
            // 유저의 Password 와 password의 hash 값을 비교한다.
            const isPwPassed = await bcrypt.compare(password, user.password);
            if (isPwPassed) {
                const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
                return {
                    ok: true,
                    token: token
                }
            } else {
                return {
                    ok: false,
                    error: "Password is InCorrected."
                }
            }
            // 문제가 생길 경우 해당 내용을 Error를 통해서 반환한다.
        }
    },
};