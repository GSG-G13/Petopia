import express from 'express'
import { getUser } from '../controllers'

const userRouter = express.Router()

userRouter.get('/:userId', getUser)

export default userRouter
