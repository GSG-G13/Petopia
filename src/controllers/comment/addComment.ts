import { type NextFunction, type Response } from 'express'
import addCommentQuery from '../../queries/comment/addComment'
import { commentSchema } from '../../validation/comment/addComment'
import { type CustomRequest } from '../../interfaces/iAuth'

const addComment = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const postId = Number(req.params.postId)
    const commentText: string = req.body.commentText

    await commentSchema.validate({ commentText })

    const commentData = { userIds: userId, postIds: postId, commentTexts: commentText }

    const data = await addCommentQuery({ ...commentData })
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export default addComment
