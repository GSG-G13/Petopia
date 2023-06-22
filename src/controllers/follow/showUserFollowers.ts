import { type Response, type NextFunction } from 'express'
import { showUserFollowersQuery } from '../../queries/follow/'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'
import { validateFollowerId } from '../../validation/follow'
const showUserFollowers = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { followerId }: { followerId: number } = await validateFollowerId.validate(req.params)

    if (!followerId) {
      throw new CustomError(400, 'User ID not found')
    }

    const followers = await showUserFollowersQuery(followerId)
    if (followers.length > 0) {
      res.json({
        data: followers
      })
    } else {
      throw new CustomError(404, 'The User Doesn\'t Have Any Followers')
    }
  } catch (err: unknown) {
    console.log(err)
    next(err)
  }
}

export default showUserFollowers
