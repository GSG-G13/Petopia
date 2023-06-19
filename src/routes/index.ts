import express from 'express'
import postRouter from './post'
import authRouter from './auth'
import commentRouter from './comment'
import categoryRouter from './category'
import userRouter from './user'
import typeRouter from './type'

const router = express.Router()

router.use('/posts', postRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/comments', commentRouter)
router.use('/categories', categoryRouter)
router.use('/users', userRouter)
router.use('/types', typeRouter)

export default router
