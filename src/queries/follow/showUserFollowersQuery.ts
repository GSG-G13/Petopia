import Follower from '../../models/Follower'
import { type IFollower } from '../../interfaces/models'
import { User } from '../../models'

const showUserFollowersQuery = async (followerId: number): Promise<IFollower[]> => {
  const userFollowers = await Follower.findAll({
    where: { followerId },
    include: [
      {
        model: User,
        as: 'followerUser',
        attributes: ['fullName', 'userImage']
      }
    ],
    raw: true
  })

  return userFollowers
}

export default showUserFollowersQuery
