import { type Response, type NextFunction } from 'express'
import { getPostLikersQuert } from '../../queries/likes/showPostLikes'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'
import { validatePostId } from '../../validation/likes'
const showPostLikers = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postId }: { postId: number } = await validatePostId.validate(req.params)

    if (!postId) {
      throw new CustomError(400, 'User ID not found')
    }

    const likers = await getPostLikersQuert(postId)

    if (likers.length > 0) {
      res.status(201).json({
        data: likers
      })
    } else {
      next(new CustomError(404, 'The Post Doesn\'t Have Any Likers'))
    }
  } catch (err: unknown) {
    next(err)
  }
}

export { showPostLikers }
