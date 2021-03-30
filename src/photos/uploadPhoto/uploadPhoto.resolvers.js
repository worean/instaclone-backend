import client from "../../client";
import { uploadS3Server } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { logginedUser }) => {
        const fileUrl = await uploadS3Server(file,logginedUser.id,"uploads");
        return client.photo.create({
          data: {
            file : fileUrl,
            caption,
            user: {
              connect: {
                id: logginedUser.id,
              },
            },
            hashtags: {
              connectOrCreate: processHashtags(caption),
            },
          },
        });
      }
    ),
  },
};
