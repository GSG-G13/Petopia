import { type Response, type NextFunction } from 'express'
import { deletePostQuery, getPostQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { type User, type CustomRequest } from '../../interfaces/iAuth'

const deletePost = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, userType } = req.user as User
    const { postId } = req.params
    const postIdNumber = Number(postId)
    if (postIdNumber < 0 || Number.isNaN(postIdNumber)) {
      throw new CustomError(400, 'Bad Request')
    }
    const post = await getPostQuery(postIdNumber)
    if (post === null) {
      throw new CustomError(400, 'Bad Request')
    }
    if (post.userId !== userId && userType === 'regular') {
      throw new CustomError(401, 'you are unauthorized to delete this post')
    }
    const result = await deletePostQuery(postIdNumber)
    if (result === 0) {
      throw new CustomError(400, 'Bad Request')
    }
    res.json({ message: 'Post deleted successfully', postId: postIdNumber })
  } catch (err: unknown) {
    next(err)
  }
}

export default deletePost
