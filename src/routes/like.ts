import express from 'express'
import {
  createLike,
  unLike,
  getPostLikers

} from '../controllers'
import authUser from '../middlewares/auth'

import checkType, { userTypes } from '../middlewares/checkType'
const { REGULAR } = userTypes

const likeRouter = express.Router()

likeRouter.post('/', authUser, checkType([REGULAR]), createLike)
likeRouter.delete('/', authUser, checkType([REGULAR]), unLike)
likeRouter.get('/likers/:postId', getPostLikers)

export default likeRouter
