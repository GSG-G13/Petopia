import express from 'express'
import {
  createLike,
  unLike,
  showUserFollowers

} from '../controllers/likes/'
import authUser from '../middlewares/auth'

import checkType, { userTypes } from '../middlewares/checkType'
const { REGULAR } = userTypes

const likeRouter = express.Router()

likeRouter.post('/', authUser, checkType([REGULAR]), createLike)
likeRouter.delete('/', checkType([REGULAR]), unLike)
likeRouter.get('/likers/:postId', showUserFollowers)

export default likeRouter
