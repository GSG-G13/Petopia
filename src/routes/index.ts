import express, { type Request, type Response } from 'express'

import { signup } from '../controllers/auth/signup'

const router = express.Router()

// Just for testing endpoint.
router.get('/test', (_req: Request, res: Response) => {
  res.json({
    error: false,
    data: {
      id: 0,
      message: 'hello'
    }
  })
})

router.post('/signup', signup)

export default router
