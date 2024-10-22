import { PrismaClientRustPanicError } from "@prisma/client/runtime";
import client from "../client";

export default {
  User: {
    // User의 속성안에 있는 내용을 수정할 수 있다. (Computed Field) -> With Prisma
    // Schema에 없는 내용이기 때문에 따로 resolver 에서 계산하여 반환한다.
    // 따라서 Schema에 해당 내용이 존재한다면, 따로 resolver를 실행시키지 않는다.
    totalFollowing: ({ id }) => {
      // 많은 사람들의 Followers 들 중에서 해당 User의 ID가 있는지 확인한다.
      return client.user.count({
        where: { followers: { some: { id } } },
      });
    },
    totalFollowers: ({ id }) => {
      // 많은 사람들의 Followers 들 중에서 해당 User의 ID가 있는지 확인한다.
      return client.user.count({
        where: { following: { some: { id } } },
      });
    },
    totalPhotos: ({ id }) => {
      // 해당유저가 올린 Photo의 갯수를 확인한다.
      return client.photo.count({
        where: { userId: { some: { id } } },
      });
    },

    isMe: ({ id }, _, { logginedUser }) => {
      // 현재 로그인된 사람이 없다면 false를 반환한다.
      if (!logginedUser) {
        return false;
      }
      // 해당 user의 아이디가 logginedUser의 Id와 동일하다면 true를 반환한다.
      return id === logginedUser.id;
    },

    isFollowing: async ({ id }, _, { logginedUser }) => {
      // 현재 로그인된 사람이 없다면 false를 반환한다.
      if (!logginedUser) {
        return false;
      }

      // user 를 찾아 해당 user의 following들 중에서 해당 id를 가진 사람을 찾는다.
      const exists = await client.user.findUnique({
        where: {
          userName: logginedUser.userName,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    photos: ({ id }, { page }) => {
      return client.user.findUnique({ where: { id } }).photos({
        // user 정보의 Client에 Pagenation을 추가한다.
        take: 5,
        skip: page ? (page - 1) * 5 : 0,
      });
    },
  },
};
