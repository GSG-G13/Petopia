import { type NextFunction, type Response } from 'express'
import addCommentQuery from '../../queries/comment/addComment'
import { commentSchema } from '../../validation/comment/addComment'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'

const addComment = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user_id = req.user?.userId as number
    const post_id = Number(req.params.postId)

    const { comment_text } = await commentSchema.validate(req.body)

    const commentData = {
      user_id,
      post_id,
      comment_text
    }

    const data = await addCommentQuery(commentData)
    res.json(data)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const customError = new CustomError(400, error.details)
      next(customError)
    } else {
      next(error)
    }
  }
}

export default addComment
