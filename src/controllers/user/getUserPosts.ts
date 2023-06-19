import { type Request, type Response, type NextFunction } from 'express'
import CustomError from '../../helpers/CustomError'
import { getUserPostsQuery } from '../../queries/user'

const getUserPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params
    const { page, limit } = req.query

    let pageNumber = Number(page) || 1
    let limitNumber = Number(limit) || 10

    if (Number(userId) < 0 || Number.isNaN(Number(userId))) {
      throw new CustomError(400, 'Bad Request.')
    }
    if (limitNumber >= 101) throw new CustomError(400, 'limit should not be more than 100')

    if (pageNumber < 0) {
      pageNumber = 1
    }
    if (limitNumber < 0) {
      limitNumber = 10
    }

    const posts = await getUserPostsQuery(Number(userId), pageNumber, limitNumber)
    if (posts.length !== 0) {
      res.status(200).json({ data: posts })
    } else {
      res.status(200).json({ data: [] })
    }
  } catch (error) {
    next(error)
  }
}
export default getUserPosts
