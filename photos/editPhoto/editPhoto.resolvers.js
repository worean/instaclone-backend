import client from '../../client';
import {protectedResolver} from '../../users/users.utils'
import {processHashtag} from '../photos.utils'
export default {
  Mutation: {
      // Loggined User가 필요하다.
    editPhoto: protectedResolver(
      async (_, { id, caption }, { logginedUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId:logginedUser.id  
          },
          include : {
              hashtags: {
                  select : {
                      hashtag: true // HashTags 에서 hashtag값 만 가져온다.
                  }
              }
          }
        });
        if(!oldPhoto) {
            return {
                ok:false,
                error:"Photo is not Found."
            }
        }
        
        const photo = await client.photo.update({
            where : {
                id
            },
            data : {
                caption,
                hashtags : {
                    disconnect : oldPhoto.hashtags,
                    connectOrCreate : processHashtag(caption)
                }
            }
        })
        if(photo){
            return {
              ok: true,
            };
        }
        return {
            ok:false,
            error:"Update is Failed."
        }
      }
    ),
  },
};