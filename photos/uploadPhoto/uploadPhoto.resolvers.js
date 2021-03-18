import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { logginedUser }) => {
        let hashTagObj = [];
        if (caption) {
          /// Parsing caption
          const hashtag = caption.match(/#[\w]+/g);
          hashTagObj = hashtag.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id:logginedUser.id
              },
            },
            ...(hashTagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashTagObj,
              },
            }),
          },
        });
      }
    ),
  },
};
