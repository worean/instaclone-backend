import client from "../../client"

export default {
    Query: {
        seeFollowing: async (_, { userName, cursor }) => {
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
            const following = await client.user
                .findUnique({ where: { userName } })
                .following({                // Relationship 형태의 요소의 경우 다음과 같이 가져올 수 있다. -> 중요!!!
                    take: 5,                // 찾은 항목들 중에서 보여줄 객체 갯수
                    skip: cursor ? 1 : 0,   // cursor 방식의 pagination은 skip이 항상 1이다. -> 처음일 경우는 0으로 들어간다.
                    ...(cursor && { cursor: { id:cursor}})  // User의 ID값이 Cursor가 된다.
                });
            return {
                ok: true,
                following
            }
        }
    }
}