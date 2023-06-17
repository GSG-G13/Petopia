import { type NextFunction, type Request, type Response } from 'express'
import getCommentQuery from '../../queries/comment/getComment'
import CustomError from '../../helpers/CustomError'

const getComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const commentId = req.params.commentId
  const id = Number(commentId)

  try {
    const comment = await getCommentQuery(id)
    if (comment !== null) {
      res.json({
        data: comment
      })
    } else {
      next(new CustomError(404, 'The Comment Was Not Found'))
    }
  } catch (error) {
    next(error)
  }
}

export default getComment
