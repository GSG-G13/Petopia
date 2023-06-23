import { type Response, type NextFunction } from 'express'
import { createFollowQuery } from '../../queries/follow/'
import { type IFollower } from '../../interfaces/fakeDataTypes'
import { validateFollowNum } from '../../validation/follow'
import { type CustomRequest } from '../../interfaces/iAuth'
import CustomError from '../../helpers/CustomError'

const createFollow = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { followerId, followingId }: IFollower = await validateFollowNum.validate({
      ...req.params,
      followingId: req.user?.userId
    }, { abortEarly: false })

    if (followerId === followingId) throw new CustomError(400, 'You Cannot follow yourself')

    const newFollow = await createFollowQuery(followerId, followingId)

    res.status(201).json({
      message: 'Follow Created Successfully',
      data: newFollow
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default createFollow
