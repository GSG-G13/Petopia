import { type Request, type Response, type NextFunction } from 'express'
import { getExplorePostsQuery } from '../../queries/post'
import CustomError from '../../helpers/CustomError'

const getExplorePosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
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

    const posts = await getExplorePostsQuery(pageNumber, limitNumber)
    if (posts.length !== 0) {
      res.json({ data: posts })
    } else {
      res.json({ data: [] })
    }
  } catch (error) {
    next(error)
  }
}
export default getExplorePosts
