import getComments from '../controllers/comment/getComments'
import getComment from '../controllers/comment/getComment'
import express from 'express'
import addComment from '../controllers/comment/addComment'
import deleteComment from '../controllers/comment/deleteComment'
import updateComment from '../controllers/comment/updateComment'
import authUser from '../middlewares/auth'
import checkType, { userTypes } from '../middlewares/checkType'
const commentRouter = express.Router()

const { REGULAR, ADMIN } = userTypes

commentRouter.get('/posts/:postId/', getComments)
commentRouter.get('/:commentId', getComment)
commentRouter.post('/', authUser, checkType([REGULAR, ADMIN]), addComment)
commentRouter.put('/:commentId', authUser, checkType([REGULAR, ADMIN]), updateComment)
commentRouter.delete('/:commentId', authUser, checkType([REGULAR, ADMIN]), deleteComment)
export default commentRouter
