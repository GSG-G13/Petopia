import express from 'express'
import postRouter from './post'

const router = express.Router()
router.use(postRouter)
export default router
