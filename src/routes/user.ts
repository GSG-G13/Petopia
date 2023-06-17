import express from 'express'
// import checkType, { userTypes } from '../middlewares/checkType'
// import authUser from '../middlewares/auth'
import { getUserPosts } from '../controllers/user'

const userRouter = express.Router()

// const { REGULAR } = userTypes
userRouter.get('/:userId/posts', getUserPosts)
export default userRouter
