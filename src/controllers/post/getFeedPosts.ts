import { type Response, type NextFunction } from 'express'
import { getFeedPostsQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'

const getFeedPosts = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const { page, limit } = req.query
    let pageNumber = Number(page) || 1
    let limitNumber = Number(limit) || 10

    if (limitNumber >= 101) throw new CustomError(400, 'limit should not be more than 100')

    if (pageNumber < 0) {
      pageNumber = 1
    }
    if (limitNumber < 0) {
      limitNumber = 10
    }

    const posts = await getFeedPostsQuery(pageNumber, limitNumber, userId)
    if (posts.length !== 0) {
      res.json({ data: posts })
    } else {
      res.json({ data: [] })
    }
  } catch (error) {
    next(error)
  }
}
export default getFeedPosts
