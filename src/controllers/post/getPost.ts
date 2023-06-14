import { type Request, type Response, type NextFunction } from 'express'
import { gePostQuery } from '../../queries/post'
import CustomError from '../../helpers/CustomError'

const getPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postId } = req.params
    const id = Number(postId)
    if (!(id > 0)) {
      next(new CustomError(401, 'Bad Request'))
    } else {
      const post = await gePostQuery(id)
      if (post !== null || post !== undefined) {
        console.log(post?.user.user_id)
        res.json({ error: false, data: post })
      } else {
        next(new CustomError(402, 'post not found'))
      }
    }
  } catch (error) {
    next(error)
  }
}
export default getPost
