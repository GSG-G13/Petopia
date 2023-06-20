import express from 'express'
import { getAllUsers, getUser, updateUser } from '../controllers'

import authUser from '../middlewares/auth'
import checkType, { userTypes } from '../middlewares/checkType'

const userRouter = express.Router()

const { REGULAR } = userTypes

userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUser)
userRouter.put('/', authUser, checkType([REGULAR]), updateUser)

export default userRouter
