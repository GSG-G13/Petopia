import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import { deleteCommentQuery, getCommentQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { validateCommentId } from '../../validation'

const deleteComment = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const userType = req.user?.userType as string

    const { commentId } = await validateCommentId.validate(req.params)

    const comment = await getCommentQuery(Number(commentId))
    const postId = comment?.postId as number

    if (comment === null) {
      throw new CustomError(400, 'The Comment Was Not Found')
    }

    if (comment?.userId === userId || userType === 'admin') {
      const deletedComment = await deleteCommentQuery(Number(commentId), postId)
      if (deletedComment) {
        res.json({
          message: 'Comment Deleted Successfully'
        })
      } else {
        throw new CustomError(400, 'The Comment Was Not Found')
      }
    } else {
      throw new CustomError(401, 'you are unauthorized to delete this comment')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default deleteComment
