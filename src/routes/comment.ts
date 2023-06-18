import express from 'express'
import {
  addComment, deleteComment, getSpecificComment, getComments, updateComment
} from '../controllers/'
import authUser from '../middlewares/auth'
import checkType, { userTypes } from '../middlewares/checkType'
const commentRouter = express.Router()

const { REGULAR, ADMIN } = userTypes

commentRouter.get('/posts/:postId/', getComments)
commentRouter.get('/:commentId', getSpecificComment)
commentRouter.post('/', authUser, checkType([REGULAR, ADMIN]), addComment)
commentRouter.put('/:commentId', authUser, checkType([REGULAR, ADMIN]), updateComment)
commentRouter.delete('/:commentId', authUser, checkType([REGULAR, ADMIN]), deleteComment)
export default commentRouter
