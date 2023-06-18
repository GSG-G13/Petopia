import { type Response, type NextFunction } from 'express'
import showPostLikes from '../../queries/likes/add'
import { type ILike } from '../../interfaces/fakeDataTypes'
import { validateLikeNum } from '../../validation/likes/'
import { type CustomRequest } from '../../interfaces/iAuth'

export type { ILike }

const unLike = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, postId }: ILike = await validateLikeNum.validate({
      ...req.body,
      userId: req.user?.userId
    }, { abortEarly: false })

    console.log(userId, '-----', postId)

    await showPostLikes(Number(userId), Number(postId))

    res.json({
      message: 'Like Deleted Successfully',
      data: null
    })
  } catch (err: unknown) {
    next(err)
  }
}

export { unLike }
