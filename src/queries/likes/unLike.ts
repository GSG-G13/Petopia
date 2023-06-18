import Like from '../../models/Like'
import CustomError from '../../helpers/CustomError'

const unLike = async (
  userId: number,
  postId: number
): Promise<void> => {
  const existingLike = await Like.findOne({
    where: { userId, postId }
  })

  if (!existingLike) {
    throw new CustomError(404, 'Like not found')
  }

  try {
    await existingLike.destroy()
  } catch (error) {
    throw new CustomError(500, 'Error occurred while unliking post')
  }
}

export default unLike
