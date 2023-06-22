import Follower from '../../models/Follower'
import { type IFollower } from '../../interfaces/models'
import { User } from '../../models'

const showUserFollowingQuery = async (followingId: number): Promise<IFollower[]> => {
  const userFollowing = await Follower.findAll({
    where: { followingId },
    include: [
      {
        model: User,
        as: 'followingUser',
        attributes: ['fullName', 'userImage']
      }
    ]
  })

  return userFollowing
}

export default showUserFollowingQuery
