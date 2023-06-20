import express from 'express'
import {
  createFollow, unfollowUser, showUserFollowers, showUserFollowing
} from '../controllers/'

import authUser from '../middlewares/auth'
import checkType, { userTypes } from '../middlewares/checkType'

const { REGULAR } = userTypes

const followRouter = express.Router()

followRouter.post('/', authUser, checkType([REGULAR]), createFollow)
followRouter.delete('/', authUser, checkType([REGULAR]), unfollowUser)
followRouter.get('/followings/:followerId', authUser, checkType([REGULAR]), showUserFollowing)
followRouter.get('/followers/:followingId', authUser, checkType([REGULAR]), showUserFollowers)

export default followRouter
