import client from "../../client"
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"

export default {
    Mutation: {
        editProfile: async (_,
            { firstName, lastName, email, password: newPassword, userName, token}
        ) => {  
            let hashedPW = null;

            // 가져온 토큰을 검증한다.
            const {id} = await jwt.verify(token, process.env.PRIVATE_KEY);

            if(newPassword) {
                hashedPW = await bcrypt.hash(newPassword,10);
            }
            const updateUser = await client.user.update({
                where:{
                    // Token에서 추출한 id값을 이용해서 user정보를 수정한다.
                    id
                },
                data:{
                    firstName,
                    lastName,
                    userName,
                    email,
                    ...(hashedPW && {password:hashedPW})
                },
            });
            if(updateUser.id) {
                return {
                    ok:true
                }
            }else {
                return {
                    ok:false,
                    error:"Could not Update Profile"
                }
            }
        }
    },
}