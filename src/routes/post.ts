import express, { type Request, type Response, type NextFunction } from 'express'
import { getPost } from '../controllers/post'

const postRouter = express.Router()

postRouter.get('/post/:postId', (req: Request, res: Response, next: NextFunction) => {
  getPost(req, res, next).catch(next)
})

export default postRouter
