import { type Response, type NextFunction } from 'express'
import unLikeQuery from '../../queries/likes/unLikeQuery'
import { type CustomRequest } from '../../interfaces/iAuth'
import { validateLikeNum } from '../../validation/likes'
import { type ILike } from '../../interfaces/fakeDataTypes'

const unLike = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, postId }: ILike = await validateLikeNum.validate({
      ...req.body,
      userId: req.user?.userId
    }, { abortEarly: false })
    await unLikeQuery(userId, postId)
    res.status(200).json({
      message: 'Like Deleted Successfully',
      data: null
    })
  } catch (error) {
    next(error)
  }
}

export default unLike
