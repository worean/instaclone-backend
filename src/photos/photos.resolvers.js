import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    isMine: ({userId},_,{logginedUser}) => {
      return userId === logginedUser.id;
    },
    hashtags: ({ id }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
    likes: ({id}) => {
      return client.like.count({
        where:{
          photoId:id
        }
      })
    },
    comments:({id}) => {
      return client.comment.count({
        where:{
          photoId:id
        }
      })
    },
  },
  Hashtag: {
    photos: ({ id }, { page }) => {
      console.log(page);
      return client.photo.findMany({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
        take: 5,
        skip: page? (page - 1) * 5 : 0,
      });
    },
    totalPhotos: ({ id }) => {
      return client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
