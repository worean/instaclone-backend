import client from '../../client';
import {protectedResolver} from '../../users/users.utils'

export default {
  Mutation: {
      // Loggined User가 필요하다.
    editPhoto: protectedResolver(
      async (_, { id, caption }, { logginedUser }) => {
        const ok = await client.photo.findFirst({
          where: {
            id,
            userId:logginedUser.id  
          },
        });
        if(!ok) {
            return {
                ok:false,
                error:"Photo is not Found."
            }
        }
        return {
            ok:true
        }
      }
    ),
  },
};