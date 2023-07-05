import Like from '../../models/Like'
import Post from '../../models/Post'

import CustomError from '../../helpers/CustomError'
import sequelize from '../../database/config'

const unLikeQuery = async (
  userId: number,
  postId: number
): Promise<void> => {
  const existingLike = await Like.findOne({
    where: { userId, postId }
  })

  if (!existingLike) {
    throw new CustomError(404, 'Like not found')
  }
  const transaction = await sequelize.transaction()

  try {
    await Post.decrement('likesCount', {
      by: 1,
      where: { postId },
      transaction
    })

    await existingLike.destroy({ transaction })

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw new CustomError(500, 'Error occurred while unfollowing user')
  }
}
export default unLikeQuery
