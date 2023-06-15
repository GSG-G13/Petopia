import getComments from '../controllers/comment/getComments'
import getComment from '../controllers/comment/getComment'
import express from 'express'
const commentRouter = express.Router()

commentRouter.get('/post/:postId/comments', getComments)
commentRouter.get('/comment/:commentId', getComment)
export default commentRouter
