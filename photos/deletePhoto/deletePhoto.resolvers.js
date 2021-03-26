import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { logginedUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!photo) {
        return {
          ok: false,
          error: "Photo(id) is not Found.",
        };
      } else if (photo.userId !== logginedUser.id) {
        return {
          ok: false,
          error: "Not Authorized.",
        };
      }
      await client.photo.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
