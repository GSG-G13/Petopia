import express from 'express'
import postRouter from './post'
import authRouter from './auth'
import commentRouter from './comment'
import categoryRouter from './category'
import followRouter from './follow'
import likeRouter from './like'
import userRouter from './user'
import typeRouter from './type'
import statsRouter from './stats'
import bookmarks from './bookmarks'

const router = express.Router()

router.use('/posts', postRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/comments', commentRouter)
router.use('/categories', categoryRouter)
router.use('/follow', followRouter)
router.use('/like', likeRouter)
router.use('/users', userRouter)
router.use('/types', typeRouter)
router.use('/stats', statsRouter)
router.use('/bookmarks', bookmarks)
export default router
