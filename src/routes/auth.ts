import express from 'express'
import { loginUsers } from '../controllers/auth/login'

const authRouter = express.Router()

authRouter.post('/login', loginUsers)

export default authRouter
