import { type Response, type NextFunction } from 'express'
import { unfollowUserQuery } from '../../queries/follow'
import { type IFollower } from '../../interfaces/fakeDataTypes'
import { validateFollowNum } from '../../validation/follow'
import { type CustomRequest } from '../../interfaces/iAuth'
import CustomError from '../../helpers/CustomError'

export type { IFollower }

const unfollowUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { followerId, followingId }: IFollower = await validateFollowNum.validate({
      ...req.params,
      followerId: req.user?.userId
    }, { abortEarly: false })

    if (followerId === followingId) throw new CustomError(400, 'You Cannot unfollow yourself')
    await unfollowUserQuery(Number(followerId), Number(followingId))

    res.json({
      message: 'User Unfollowed Successfully'
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default unfollowUser
