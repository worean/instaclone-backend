import client from '../client'

export default {
    Query: {
        movies: () => client.movie.findMany(), // movie테이블의 정보들을 모두 가져온다.
        movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
      },
}