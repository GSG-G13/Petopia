import express from 'express'
import { getUserPosts } from '../controllers/user'

const userRouter = express.Router()
userRouter.get('/:userId/posts', getUserPosts)
export default userRouter
