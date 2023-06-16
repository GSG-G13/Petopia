import { type Request, type Response, type NextFunction } from 'express'
import addCommentQuery from '../../queries/comment/addComment'
import { commentSchema } from '../../validation/comment/addComment'

const addComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, postId, commentText } = req.body
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
