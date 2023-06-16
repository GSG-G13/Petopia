import express from 'express'
import authRouter from './auth'
import categoryRouter from './category'
import typeRouter from './type'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/categories', categoryRouter)
router.use('/types', typeRouter)

export default router
