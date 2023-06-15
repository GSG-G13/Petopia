import { type NextFunction, type Request, type Response } from 'express'
import getCommentQuery from '../../queries/comment/getComment'

const getComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const commentId = req.params.commentId
  const id = Number(commentId)

  try {
    const comment = await getCommentQuery(id)
    res.json(comment)
  } catch (error) {
    next(error)
  }
}

export default getComment
