import express from 'express'
import postRouter from './post'
import authRouter from './auth'
import categoryRouter from './category'

const router = express.Router()

router.use('/post', postRouter)
router.use('/auth', authRouter)
router.use('/categories', categoryRouter)

export default router
