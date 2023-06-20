import express from 'express'
import { addPost, deletePost, getExplorePosts, getPost, updatePost } from '../controllers'
import checkType, { userTypes } from '../middlewares/checkType'
import authUser from '../middlewares/auth'

const postRouter = express.Router()

const { REGULAR, ADMIN } = userTypes
postRouter.get('/', getExplorePosts)
postRouter.get('/:postId', getPost)
postRouter.post('/', authUser, checkType([REGULAR]), addPost)
postRouter.put('/:postId', authUser, checkType([REGULAR]), updatePost)
postRouter.delete('/:postId', authUser, checkType([ADMIN, REGULAR]), deletePost)
export default postRouter
