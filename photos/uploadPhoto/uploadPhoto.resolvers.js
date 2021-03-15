import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
            /// Parsing caption
            
            // get or create Hashtagss
        }
      }
    ),
  },
};
