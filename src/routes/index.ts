import express from 'express'
import authRouter from './auth'
import commentRouter from './comment'
import categoryRouter from './category'
import followRouter from './follow'
import likeRouter from './like'
import userRouter from './user'
import typeRouter from './type'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/comments', commentRouter)
router.use('/categories', categoryRouter)
router.use('/follow', followRouter)
router.use('/like', likeRouter)
router.use('/users', userRouter)
router.use('/types', typeRouter)

export default router
