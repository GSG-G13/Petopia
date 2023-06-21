import express from 'express'
import {
  createFollow, unfollowUser, showUserFollowers, showUserFollowing
} from '../controllers/'

import authUser from '../middlewares/auth'
import checkType, { userTypes } from '../middlewares/checkType'

const { REGULAR, ADMIN } = userTypes

const followRouter = express.Router()

followRouter.post('/followers/:followerId', authUser, checkType([REGULAR]), createFollow)
followRouter.delete('/followings/:followerId', authUser, checkType([REGULAR]), unfollowUser)
followRouter.get('/followings/:followerId', authUser, checkType([REGULAR, ADMIN]), showUserFollowing)
followRouter.get('/followers/:followingId', authUser, checkType([REGULAR, ADMIN]), showUserFollowers)

export default followRouter
