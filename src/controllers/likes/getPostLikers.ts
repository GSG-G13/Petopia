import { type Response, type NextFunction } from 'express'
import { getPostLikersQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'
import { validatePostId } from '../../validation/likes'
const getPostLikers = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postId }: { postId: number } = await validatePostId.validate(req.params)

    if (!postId) {
      throw new CustomError(400, 'Post not found')
    }
    const likers = await getPostLikersQuery(postId)
    res.json({
      data: likers
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default getPostLikers
