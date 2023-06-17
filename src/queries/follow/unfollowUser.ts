import Follower from '../../models/Follower'
import User from '../../models/User'
import sequelize from '../../database/config'
import CustomError from '../../helpers/CustomError'

const unFollowUser = async (
  followerId: number,
  followingId: number
): Promise<void> => {
  const existingFollow = await Follower.findOne({
    where: { followerId, followingId }
  })

  if (!existingFollow) {
    //  if does not exist
    return
  }

  const transaction = await sequelize.transaction()

  try {
    await User.decrement('followerCount', {
      by: 1,
      where: { userId: followingId },
      transaction
    })

    await User.decrement('followingCount', {
      by: 1,
      where: { userId: followerId },
      transaction
    })

    await existingFollow.destroy({ transaction })

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw new CustomError(500, 'Error occurred while unfollowing user')
  }
}

export default unFollowUser
