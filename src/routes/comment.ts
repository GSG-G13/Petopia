import getComments from '../controllers/comment/getComments'
import getComment from '../controllers/comment/getComment'
import express from 'express'
import checkType, { userTypes } from '../middlewares/checkType'
import authUser from '../middlewares/auth'
import addComment from '../controllers/comment/addComment'
const { REGULAR } = userTypes
const commentRouter = express.Router()

commentRouter.get('/post/:postId/comments', getComments)
commentRouter.get('/comment/:commentId', getComment)
commentRouter.post('/', authUser, checkType([REGULAR]), addComment)
commentRouter.post('/comment', authUser, addComment)
export default commentRouter
