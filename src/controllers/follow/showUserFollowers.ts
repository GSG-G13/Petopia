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
    res.json({
      data: followers
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default showUserFollowers
