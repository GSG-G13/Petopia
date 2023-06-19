import express from 'express'
import { getAllUsers, getUser, updateUser } from '../controllers'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUser)
userRouter.put('/', updateUser)

export default userRouter
