import Follower from '../../models/Follower'
import { type IFollower } from '../../interfaces/models'
import { User } from '../../models/'

const getUserFollowing = async (followerId: number): Promise<IFollower[]> => {
  const userFollowing = await Follower.findAll({
    where: { followerId },
    include: [
      {
        model: User,
        attributes: ['fullName', 'userImage']
      }
    ]
  })

  return userFollowing
}

export { getUserFollowing }
