import express from 'express'
import postRouter from './post'
import authRouter from './auth'
import commentRouter from './comment'
import categoryRouter from './category'
import userRouter from './user'

const router = express.Router()

router.use('/post', postRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/comments', commentRouter)
router.use('/categories', categoryRouter)

export default router
