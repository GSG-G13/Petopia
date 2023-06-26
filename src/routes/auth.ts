import express from 'express'
import { login, signup, logout, checkAuth } from '../controllers'
import authUser from '../middlewares/auth'

const router = express.Router()

router.get('/', authUser, checkAuth)
router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', logout)

export default router
