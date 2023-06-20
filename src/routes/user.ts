import express from 'express'
import { getAllUsers, getUser, getUserPosts, updateStatus } from '../controllers'
import authUser from '../middlewares/auth'
import checkType, { userTypes } from '../middlewares/checkType'

const { ADMIN } = userTypes

const userRouter = express.Router()
userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUser)
userRouter.get('/:userId/posts', getUserPosts)
userRouter.patch('/:userId', authUser, checkType([ADMIN]), updateStatus)

export default userRouter
