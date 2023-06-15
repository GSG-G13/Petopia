import getComments from '../controllers/comment/getComments'
import express from 'express'
const commentRouter = express.Router()

commentRouter.get('/post/:postId/comments', getComments)
export default commentRouter
