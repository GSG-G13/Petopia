import express from 'express'
import authRouter from './auth'

const router = express.Router()
// just for testing endpoint.
router.get('/test', (_req, res) => {
  res.json({
    error: false,
    data: {
      id: 0,
      message: 'hello'
    }
  })
})

router.use(authRouter)

export default router
