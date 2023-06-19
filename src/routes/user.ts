import express from 'express'
import { getAllUsers, getUser } from '../controllers'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUser)
userRouter.put('/:userId', getUser)

export default userRouter
