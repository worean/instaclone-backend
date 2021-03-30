import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { logginedUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
      });
      if (!photo) {
        return {
          ok: false,
          error: "Photo is not Found.",
        };
      }
      const likeWhere = {
          userId_photoId: {
            userId: logginedUser.id, // 로그인 유저 ID 확인
            photoId: id, // 포스트 ID 확인
          },
      };
      const like = await client.like.findUnique({
        where: likeWhere
        });
      if (like) {
        await client.like.delete({
          where: likeWhere
        });
      }
      else {
          await client.like.create({
              data : {
                  user : {
                      connect : {
                          id:logginedUser.id
                      }
                  },
                  photo: {
                      connect : {
                          id:photo.id // 그냥 id라고 해도 상관없다.
                      }
                  }
              }
          })
      }
      return {
          ok:true
      }
    }),
  },
};
