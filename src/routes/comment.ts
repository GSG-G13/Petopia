import getComments from '../controllers/comment/getComments'
import getComment from '../controllers/comment/getComment'
import express from 'express'
import addComment from '../controllers/comment/addComment'
import deleteComment from '../controllers/comment/deleteComment'
const commentRouter = express.Router()

commentRouter.get('/post/:postId/comments', getComments)
commentRouter.get('/comment/:commentId', getComment)
commentRouter.post('/comment', addComment)
commentRouter.delete('/comment/:commentId', deleteComment)
export default commentRouter
