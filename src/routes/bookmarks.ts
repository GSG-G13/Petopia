import express from 'express'
import checkType, { userTypes } from '../middlewares/checkType'
import authUser from '../middlewares/auth'
import { getBookmarks } from '../controllers'

const { REGULAR } = userTypes

const router = express.Router()

router.get('/', authUser, checkType([REGULAR]), getBookmarks)
router.post('/', authUser, checkType([REGULAR]))
router.delete('/', authUser, checkType([REGULAR]))

export default router
