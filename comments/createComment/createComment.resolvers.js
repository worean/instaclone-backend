import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { logginedUser }) => {
        // 해당 Photo를 가져온다.
        const photo = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });
        if (!photo) {
          return {
            ok: false,
            error: "Photo is not Found.",
          };
        }
        // Comment 생성 및 관계연결
        await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id: photoId,
              },
            },
            user: {
              connect: {
                id: logginedUser.id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
