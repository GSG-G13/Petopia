import Like from '../../models/Like'
import { type ILike } from '../../interfaces/models'

import Post from '../../models/Post'

const addLike = async (
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

  const newLike = await Like.create({ userId, postId })

  return newLike
}

export default addLike
