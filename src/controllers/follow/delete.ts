import { type Response, type NextFunction } from 'express'
import unFollowUser from '../../queries/follow/unfollowUser'
import { type IFollower } from '../../interfaces/fakeDataTypes'
import { validateFollowNum } from '../../validation/follow/'
import { type CustomRequest } from '../../interfaces/iAuth'

export type { IFollower }

const unFollow = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { followerId, followingId }: IFollower = await validateFollowNum.validate({
      ...req.body,
      followerId: req.user?.userId
    }, { abortEarly: false })

    await unFollowUser(Number(followerId), Number(followingId))

    res.json({
      message: 'Follow Deleted Successfully',
      data: null
    })
  } catch (err: unknown) {
    next(err)
  }
}

export { unFollow }
