import { type Request, type Response, type NextFunction } from 'express'
import deleteCommentQuery from '../../queries/comment/deleteComment'
import CustomError from '../../helpers/CustomError'
import { deleteCommentSchema } from '../../validation/comment/deleteComment'

const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { commentId } = req.params
    await deleteCommentSchema.validate({ commentId })

    const deletedComment = await deleteCommentQuery(Number(commentId))

    if (deletedComment) {
      res.json({
        message: 'Comment Deleted Successfully',
        data: deletedComment
      })
    } else {
      throw new CustomError(400, 'The Comment Was Not Found')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default deleteComment
