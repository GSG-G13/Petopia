import { type Request, type Response, type NextFunction } from 'express'
import CustomError from '../../helpers/CustomError'
import { getUserPostsQuery } from '../../queries/user'

const getUserPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params
    const { page } = req.query
    if (Number(userId) < 0 || Number.isNaN(Number(userId)) || Number(page) < 0 || Number.isNaN(Number(page))) {
      throw new CustomError(400, 'Bad Request.')
    }
    const posts = await getUserPostsQuery(Number(userId), Number(page), 10)
    if (posts.length !== 0) {
      res.status(201).json({ data: posts })
    } else {
      throw new CustomError(404, 'posts not found')
    }
  } catch (error) {
    next(error)
  }
}
export default getUserPosts
