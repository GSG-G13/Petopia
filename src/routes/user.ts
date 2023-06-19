import express from 'express'
import { getAllUsers, getUser, getUserPosts } from '../controllers'

const userRouter = express.Router()
userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUser)
userRouter.get('/:userId/posts', getUserPosts)
export default userRouter
