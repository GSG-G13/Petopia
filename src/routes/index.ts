import express, { type Request, type Response } from 'express'

import { signup } from '../controllers/auth/'
import { createCategory } from '../controllers/category/add'
import { updateCategory } from '../controllers/category/edit'
import { deleteCategory } from '../controllers/category/delete'
import { showAllCategories } from '../controllers/category/showAll'
import { showCategoryById } from '../controllers/category/showById'

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
router.post('/categories', createCategory)
router.put('/categories/:categoryId', updateCategory)
router.delete('/categories/:categoryId', deleteCategory)
router.get('/categories/', showAllCategories)
router.get('/categories/:categoryId', showCategoryById)

export default router
