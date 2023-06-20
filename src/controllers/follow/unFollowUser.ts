import { type Response, type NextFunction } from 'express'
import { unfollowUserQuery } from '../../queries/follow'
import { type IFollower } from '../../interfaces/fakeDataTypes'
import { validateFollowNum } from '../../validation/follow'
import { type CustomRequest } from '../../interfaces/iAuth'

export type { IFollower }

const unfollowUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { followerId, followingId }: IFollower = await validateFollowNum.validate({
      ...req.body,
      followerId: req.user?.userId
    }, { abortEarly: false })

    await unfollowUserQuery(Number(followerId), Number(followingId))

    res.status(200).json({
      message: 'User Unfollowed Successfully',
      data: null
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default unfollowUser
