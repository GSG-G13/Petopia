import express from 'express'
import {
  createFollow,
  unFollow,
  showUserFollowing,
  showUserFollowers

} from '../controllers/follow/'
import authUser from '../middlewares/auth'
import checkType, { userTypes } from '../middlewares/checkType'

const { REGULAR } = userTypes

const followRouter = express.Router()

followRouter.post('/', authUser, checkType([REGULAR]), createFollow)
followRouter.delete('/', authUser, checkType([REGULAR]), unFollow)
followRouter.get('/following', authUser, checkType([REGULAR]), showUserFollowing)
followRouter.get('/followers', authUser, checkType([REGULAR]), showUserFollowers)

export default followRouter
