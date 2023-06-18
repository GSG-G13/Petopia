import Like from '../../models/Like'
import sequelize from '../../database/config'
import CustomError from '../../helpers/CustomError'

const unLike = async (
  userId: number,
  postId: number
): Promise<void> => {
  const existingLike = await Like.findOne({
    where: { userId, postId }
  })

  if (!existingLike) {
    //  if does not exist
    return
  }

  const transaction = await sequelize.transaction()

  try {
    await existingLike.destroy({ transaction })

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw new CustomError(500, 'Error occurred while unliking post')
  }
}

export default unLike
