import { type Response, type NextFunction } from 'express'
import { showUserFollowersQuery } from '../../queries/follow/'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'
import { validateFollowingId } from '../../validation/follow'
const showUserFollowers = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { followingId }: { followingId: number } = await validateFollowingId.validate(req.params)

    if (!followingId) {
      throw new CustomError(400, 'User ID not found')
    }

    const followers = await showUserFollowersQuery(followingId)

    if (followers.length > 0) {
      res.json({
        data: followers
      })
    } else {
      next(new CustomError(404, 'The User Doesn\'t Have Any Followers'))
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default showUserFollowers
