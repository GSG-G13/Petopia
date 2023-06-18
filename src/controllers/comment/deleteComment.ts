import { type Request, type Response, type NextFunction } from 'express'
import { deleteCommentQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { validateCommentId } from '../../validation'

const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { commentId } = await validateCommentId.validate(req.params)

    const deletedComment = await deleteCommentQuery(Number(commentId))

    if (deletedComment) {
      res.json({
        message: 'Comment Deleted Successfully'
      })
    } else {
      throw new CustomError(400, 'The Comment Was Not Found')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default deleteComment
