import { type Response, type NextFunction } from 'express'
import { showUserFollowingQuery } from '../../queries/follow/'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'
import { validateFollowerId } from '../../validation/follow'

const showUserFollowing = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { followerId }: { followerId: number } = await validateFollowerId.validate(req.params)

    if (!followerId) {
      throw new CustomError(400, 'User ID not found')
    }

    const followers = await showUserFollowingQuery(followerId)

    if (followers.length > 0) {
      res.json({
        data: followers
      })
    } else {
      throw new CustomError(404, 'The User Doesn\'t Have Any Followers')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default showUserFollowing
