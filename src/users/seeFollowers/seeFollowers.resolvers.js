import client from "../../client"

export default {
    Query: {
        seeFollowers: async (_, { userName, page }) => {
            const verified = await client.user.findUnique({
                where: { userName },
                select: { id: true },// user정보 중에서 id만을 가져온다.
            })
            if (!verified) {
                return {
                    ok: false,
                    error: "Cannot Find the User."
                }
            }
            const followers = await client.user
                .findUnique({ where: { userName } })
                .followers({                // Relationship 형태의 요소의 경우 다음과 같이 가져올 수 있다. -> 중요!!!
                    take: 5,                // 찾은 항목들 중에서 보여줄 객체 갯수
                    skip: (page - 1) * 5,   // 찾은 항목들 중에서 넘겨버릴 객체 갯수
                });
            const totalFollowers = await client.user.count({
                where: {
                    following: {        // Some 유저들이 Following 하는 User중
                        some: {
                            userName    // 해당 userName이 있는 User가 있다면 가져온다.
                        },
                    },
                }
            });
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5)
            }
            //// 해당 내용은 많은 유저들 중에서 해당 userName을 팔로잉 하는 유저를 일정수(대충 적당히) 가져오는 방식이다.
            // const bFollowers = await client.user.findMany({
            //     where: {
            //         following: {
            //             some: {
            //                 userName,
            //             },
            //         },
            // }});
        }
    }
}