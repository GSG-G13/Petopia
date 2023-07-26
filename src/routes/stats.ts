import express from 'express'
import { getStats } from '../controllers'
import checkType, { userTypes } from '../middlewares/checkType'
import authUser from '../middlewares/auth'

const statsRouter = express.Router()

const { ADMIN } = userTypes

statsRouter.get('/', authUser, checkType([ADMIN]), getStats)

export default statsRouter
