import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import { addCommentQuery } from '../../queries'
import { commentSchema } from '../../validation'

const addComment = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const { postId, commentText } = req.body
    await commentSchema.validate({ commentText })

    const newComment = await addCommentQuery(userId, postId, commentText)

    res.status(201).json({
      message: 'Comment Created Successfully',
      data: newComment
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default addComment
