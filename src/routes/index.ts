import express from 'express'
import authRouter from './account'
import categoryRouter from './category'

const router = express.Router()

router.use('/account', authRouter)
router.use('/categories', categoryRouter)

export default router
