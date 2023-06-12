import express from 'express'

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

export default router
