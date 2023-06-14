import express from 'express'
import postRouter from './post'
import account from './account'

const router = express.Router()

router.use(postRouter)
router.use('/account', account)

export default router
