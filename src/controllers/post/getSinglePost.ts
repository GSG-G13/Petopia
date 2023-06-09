import { type Request, type Response, type NextFunction } from 'express'
import { getPostQuery } from '../../queries/post'
import CustomError from '../../helpers/CustomError'

const getPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postId } = req.params
    const id = Number(postId)
    if (id < 0 || Number.isNaN(id)) {
      throw new CustomError(400, 'Bad Request')
    } else {
      const post = await getPostQuery(id)
      if (post !== null) {
        res.json({ data: post })
      } else {
        throw new CustomError(404, 'post not found')
      }
    }
  } catch (err) {
    next(err)
  }
}
export default getPost
