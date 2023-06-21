import express from 'express'
import { updateUser, getAllUsers, getUser, getUserPosts, updateStatus } from '../controllers'

import authUser from '../middlewares/auth'
import checkType, { userTypes } from '../middlewares/checkType'

const userRouter = express.Router()

const { REGULAR } = userTypes
const { ADMIN } = userTypes

userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUser)
userRouter.put('/', authUser, checkType([REGULAR]), updateUser)
userRouter.get('/:userId/posts', getUserPosts)
userRouter.patch('/:userId', authUser, checkType([ADMIN]), updateStatus)

export default userRouter
