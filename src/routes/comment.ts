import getComments from '../controllers/comment/getComments'
import getComment from '../controllers/comment/getComment'
import express from 'express'
import addComment from '../controllers/comment/addComment'
const commentRouter = express.Router()

commentRouter.get('/post/:postId/comments', getComments)
commentRouter.get('/comment/:commentId', getComment)
commentRouter.post('/comment', addComment)
export default commentRouter
