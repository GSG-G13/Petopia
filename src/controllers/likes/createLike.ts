import { type Response, type NextFunction } from 'express'
import { createLikeQuery } from '../../queries'
import { type ILike } from '../../interfaces/fakeDataTypes'
import { validateLikeNum } from '../../validation/likes'
import { type CustomRequest } from '../../interfaces/iAuth'
import CustomError from '../../helpers/CustomError'

const createLike = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, postId }: ILike = await validateLikeNum.validate({
      ...req.body,
      userId: req.user?.userId
    }, { abortEarly: false })

    if (!userId || !postId) {
      throw new CustomError(400, 'userId and postId are required fields')
    }

    const newLike = await createLikeQuery(userId, postId)

    res.status(201).json({
      message: 'Like Created Successfully',
      data: newLike
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default createLike
