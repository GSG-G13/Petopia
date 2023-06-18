import { type Response, type NextFunction } from 'express'
import addLike from '../../queries/likes/add'
import { type ILike } from '../../interfaces/fakeDataTypes'
import { validateLikeNum } from '../../validation/likes/'
import { type CustomRequest } from '../../interfaces/iAuth'

const createLike = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log(req.user)
    const { userId, postId }: ILike = await validateLikeNum.validate({
      ...req.body,
      userId: req.user?.userId
    }, { abortEarly: false })

    const newLike = await addLike(userId, postId)

    res.status(201).json({
      message: 'Like Created Successfully',
      data: newLike
    })
  } catch (err: unknown) {
    console.log(err)

    next(err)
  }
}

export { createLike }
