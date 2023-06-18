import { type Request, type Response, type NextFunction } from 'express'
import { updateCommentQuery } from '../../queries'
import { type IComment } from '../../interfaces/models'
import CustomError from '../../helpers/CustomError'
import { commentSchema } from '../../validation'

const updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { commentId } = req.params

    const { commentText }: { commentText: string } = await commentSchema.validate(req.body, { abortEarly: false })

    const updatedComment: IComment | null = await updateCommentQuery(Number(commentId), commentText)

    if (updatedComment != null) {
      res.json({
        message: 'Comment Updated Successfully',
        data: updatedComment
      })
    } else {
      throw new CustomError(400, 'The Comment Was Not Found')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default updateComment
