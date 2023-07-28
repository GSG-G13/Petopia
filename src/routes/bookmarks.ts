import express from 'express'
import checkType, { userTypes } from '../middlewares/checkType'
import authUser from '../middlewares/auth'
import { getBookmarks, addBookmarks, deleteBookmarks,getBookmarkers } from '../controllers'

const { REGULAR } = userTypes

const router = express.Router()

router.get('/', authUser, checkType([REGULAR]), getBookmarks)
router.get('/bookmarkers/:postId', authUser, checkType([REGULAR]), getBookmarkers)
router.post('/:postId', authUser, checkType([REGULAR]), addBookmarks)
router.delete('/:postId', authUser, checkType([REGULAR]), deleteBookmarks)

export default router
