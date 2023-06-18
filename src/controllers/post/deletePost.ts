import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import { deletePostQuery, getPostQuery } from '../../queries/post'
import CustomError from '../../helpers/CustomError'

const deletePost = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId
    const { postId } = req.params
    if (Number(postId) < 0 || Number.isNaN(Number(postId))) {
      throw new CustomError(400, 'Bad Request')
    }
    const post = await getPostQuery(Number(postId))
    if (post === null) {
      throw new CustomError(404, 'Post not found.')
    }
    if (post.userId !== userId) {
      throw new CustomError(401, 'you are unauthorized to delete this post')
    }
    const result = await deletePostQuery(Number(postId))
    if (result === 0) {
      throw new CustomError(404, 'Post not found.')
    }
    res.status(200).json({ message: 'Post deleted successfully', postId: Number(postId) })
  } catch (err: unknown) {
    next(err)
  }
}

export default deletePost
