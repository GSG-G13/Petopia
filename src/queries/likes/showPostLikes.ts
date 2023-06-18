import Like from '../../models/Like'
import { type ILike } from '../../interfaces/models'
import { User } from '../../models'

const getPostLikersQuert = async (postId: number): Promise<ILike[]> => {
  const postLikers = await Like.findAll({
    where: { postId },
    include: [
      {
        model: User,
        attributes: ['fullName', 'userImage']
      }
    ],
    raw: true
  })

  return postLikers
}

export { getPostLikersQuert }
