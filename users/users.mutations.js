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
        },
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
            if(isPwPassed) {
                return {
                    ok:true,
                }
            }else {
                return {
                    ok:false,
                    error:"Password is InCorrected."
                }
            }

            // 문제가 생길 경우 해당 내용을 Error를 통해서 반환한다.
        }
    },
};