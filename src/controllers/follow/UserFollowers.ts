import { type Response, type NextFunction } from 'express'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'
import { getUserFollowers } from '../../queries/follow/showUserFollowers'
import { User } from '../../models/'

interface IFollower {
  followId: number
  followerId: number
  followingId: number
  fullName: string
  userImage: string
}

const showUserFollowers = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const followingId: number | undefined = req.user?.userId

    if (!followingId) {
      throw new CustomError(400, 'User ID not found')
    }

    let followers = await getUserFollowers(followingId)

    if (followers.length > 0) {
      followers = await Promise.all(
        followers.map(async (follower: IFollower) => {
          const user = await User.findOne({ where: { userId: follower.followerId } })
          return {
            ...follower,
            fullName: user?.fullName,
            userImage: user?.userImage
          }
        })
      )
      res.json({
        data: followers
      })
    } else {
      next(new CustomError(404, "The User Doesn't Have Any Followers"))
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(new CustomError(500, err.message))
    }
  }
}

export { showUserFollowers }
