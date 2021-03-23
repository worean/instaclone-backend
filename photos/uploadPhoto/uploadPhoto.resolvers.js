import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtag } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { logginedUser }) => {
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: logginedUser.id,
              },
            },
            hashtags: {
              connectOrCreate: processHashtag(caption),
            },
          },
        });
      }
    ),
  },
};
