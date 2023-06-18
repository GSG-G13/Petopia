import express from 'express'
import authRouter from './auth'
import commentRouter from './comment'
import categoryRouter from './category'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/comments', commentRouter)
router.use('/categories', categoryRouter)

export default router
