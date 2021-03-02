import jwt from "jsonwebtoken"
import client from "../client";

export const GetUser = async (token) =>{
    const {id} = await jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await client.user.findUnique({where:{id}});
    if(user) {
        return user;
    }else{
        return null;
    }
}