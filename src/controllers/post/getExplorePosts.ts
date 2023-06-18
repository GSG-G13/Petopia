import { type Request, type Response, type NextFunction } from 'express'
import { getExplorePostsQuery } from '../../queries/post'
import CustomError from '../../helpers/CustomError'

const getExplorePosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page } = req.query
    const pageNumber = Number(page)
    if (pageNumber < 0 || Number.isNaN(pageNumber)) {
      throw new CustomError(401, 'Bad Request.')
    }
    const posts = await getExplorePostsQuery(pageNumber, 10)
    if (posts.length !== 0) {
      res.status(200).json({ data: posts })
    } else {
      throw new CustomError(404, 'posts not found')
    }
  } catch (error) {
    next(error)
  }
}
export default getExplorePosts
