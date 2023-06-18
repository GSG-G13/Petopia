import { type NextFunction, type Request, type Response } from 'express'
import { getCommentQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { validateCommentId } from '../../validation'

const getSpecificComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { commentId } = await validateCommentId.validate(req.params)
    const comment = await getCommentQuery(Number(commentId))
    if (comment !== null) {
      res.json({
        data: comment
      })
    } else {
      next(new CustomError(404, 'The Comment Was Not Found'))
    }
  } catch (err) {
    next(err)
  }
}

export default getSpecificComment
