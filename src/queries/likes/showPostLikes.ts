import Follower from '../../models/Follower'
import { type IFollower } from '../../interfaces/models'
import { User } from '../../models'

const getUserFollowers = async (followingId: number): Promise<IFollower[]> => {
  const userFollowers = await Follower.findAll({
    where: { followingId },
    include: [
      {
        model: User,
        as: 'followingUser',
        attributes: ['fullName', 'userImage']
      }
    ],
    raw: true
  })

  return userFollowers
}

export { getUserFollowers }
