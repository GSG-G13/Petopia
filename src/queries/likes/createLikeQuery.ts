import Like from '../../models/Like'
import Post from '../../models/Post'
import sequelize from '../../database/config'
import CustomError from '../../helpers/CustomError'

import { type ILike } from '../../interfaces/models'

const createLikeQuery = async (
  userId: number,
  postId: number
): Promise<ILike | null> => {
  const postExists = await Post.findOne({
    where: { postId }
  })

  if (!postExists) {
    throw new Error('Post not found')
  }

  const existingLike = await Like.findOne({
    where: { userId, postId }
  })

  if (existingLike) {
    // LIke already exists, no need to create a new record
    return existingLike
  }
  const transaction = await sequelize.transaction()
  try {
    await Post.increment('likesCount', {
      by: 1,
      where: { postId },
      transaction

    })

    const newLike = await Like.create({ userId, postId })

    await transaction.commit()

    return newLike
  } catch (error) {
    await transaction.rollback()
    throw new CustomError(500, 'Error occurred while adding follow')
  }
}

export default createLikeQuery
