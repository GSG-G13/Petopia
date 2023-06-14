import express from 'express'
import { getPost } from '../controllers/post'

const postRouter = express.Router()

postRouter.get('/post/:postId', getPost)

export default postRouter
