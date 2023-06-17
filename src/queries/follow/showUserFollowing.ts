import Follower from '../../models/Follower'
import { type IFollower } from '../../interfaces/models'
import { User } from '../../models/'

const getUserFollowing = async (followerId: number): Promise<IFollower[]> => {
  const userFollowing = await Follower.findAll({
    where: { followerId }, // Filter by followerId
    include: [
      {
        model: User,
        attributes: ['fullName', 'userImage'] // Include fullName and userImage
      }
    ]
  })

  return userFollowing
}

export { getUserFollowing }
