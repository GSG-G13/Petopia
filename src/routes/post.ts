import express from 'express'
import { addPost, getPost } from '../controllers/post'
import checkType, { userTypes } from '../middlewares/checkType'
import authUser from '../middlewares/auth'

const postRouter = express.Router()

const { REGULAR } = userTypes
postRouter.get('/:postId', getPost)
postRouter.post('/', authUser, checkType([REGULAR]), addPost)
export default postRouter
