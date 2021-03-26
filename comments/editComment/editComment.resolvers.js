import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(async (_, { id ,payload}, { logginedUser }) => {
      // 해당 Photo를 가져온다.
      const comment = await client.comment.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!comment) {
        return {
          ok: false,
          error: "comment is not Found.",
        };
      } else if (comment.userId !== logginedUser.id) {
        return {
          ok: false,
          error: "comment is not Mine.",
        };
      }
      await client.comment.update({
        where: {
          id,
        },
        data : {
          payload
        }
      });
      return {
        ok: true,
      };
    }),
  },
};
