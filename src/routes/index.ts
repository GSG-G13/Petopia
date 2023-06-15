import express from 'express'
import authRouter from './auth'
import commentRouter from './comment'

const router = express.Router()

router.use('/auth', authRouter)
router.use(commentRouter)

export default router
