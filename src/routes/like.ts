import express from 'express'
import {
  createLike,
  deleteLike,
  showPostLikers

} from '../controllers/likes/'
import authUser from '../middlewares/auth'

import checkType, { userTypes } from '../middlewares/checkType'
const { REGULAR } = userTypes

const likeRouter = express.Router()

likeRouter.post('/', authUser, checkType([REGULAR]), createLike)
likeRouter.delete('/', authUser, checkType([REGULAR]), deleteLike)
likeRouter.get('/likers/:postId', showPostLikers)

export default likeRouter
