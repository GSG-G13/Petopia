import Follower from '../../models/Follower'
import User from '../../models/User'
import { type IFollower } from '../../interfaces/models'
import sequelize from '../../database/config'
import CustomError from '../../helpers/CustomError'

const createFollowQuery = async (
  followerId: number,
  followingId: number
): Promise<IFollower | null> => {
  if (followerId === followingId) {
    // User cannot follow themselves
    return null
  }

  const existingFollow = await Follower.findOne({
    where: { followerId, followingId }
  })

  if (existingFollow) {
    // Relationship already exists, no need to create a new record
    throw new CustomError(400, 'You already Following this user')
  }

  const transaction = await sequelize.transaction()

  try {
    // Increment followingCount for the user
    await User.increment('followingCount', {
      by: 1,
      where: { userId: followerId },
      transaction
    })

    // Increment followerCount for another user
    await User.increment('followerCount', {
      by: 1,
      where: { userId: followingId },
      transaction
    })

    const newFollow = await Follower.create(
      { followerId, followingId },
      { transaction }
    )

    await transaction.commit()

    return newFollow
  } catch (error) {
    await transaction.rollback()
    throw new CustomError(500, 'Error occurred while adding follow')
  }
}

export default createFollowQuery
