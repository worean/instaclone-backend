import client from "../../client";

export default  {
    Query: {
        seeProfile: async(_, { userName }) =>{
            const user = await client.user.findUnique({
                where: {
                    userName,
                },
                // // 관계를 가져오고 싶다면 include를 한다. 해당 내용은 왠만하면 연산처리가 많아지기에 갯수 제한이 걸려있다.
                // include: {
                //     followers:true,
                //     following:true
                // }
            })
            return user;
        }
    },
}