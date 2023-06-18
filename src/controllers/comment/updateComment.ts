import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import { updateCommentQuery, getCommentQuery } from '../../queries'
import { type IComment } from '../../interfaces/models'
import CustomError from '../../helpers/CustomError'
import { commentSchema } from '../../validation'

const updateComment = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const userType = req.user?.userType as string

    const { commentId } = req.params

    const { commentText }: { commentText: string } = await commentSchema.validate(req.body, { abortEarly: false })

    const comment = await getCommentQuery(Number(commentId))

    if (comment === null) {
      throw new CustomError(400, 'The Comment Was Not Found')
    }

    if (comment?.userId === userId || userType === 'admin') {
      const updatedComment: IComment | null = await updateCommentQuery(Number(commentId), commentText)

      if (updatedComment != null) {
        res.json({
          message: 'Comment Updated Successfully',
          data: updatedComment
        })
      } else {
        throw new CustomError(400, 'The Comment Was Not Found')
      }
    } else {
      throw new CustomError(401, 'you are unauthorized to update this comment')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default updateComment
