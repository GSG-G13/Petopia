import express from 'express'
import {
  createCategory,
  deleteCategory, updateCategory,
  showAllCategories, showCategoryById
} from '../controllers/category/'

const categoryRouter = express.Router()

categoryRouter.post('/', createCategory)
categoryRouter.put('/:categoryId', updateCategory)
categoryRouter.delete('/:categoryId', deleteCategory)
categoryRouter.get('/', showAllCategories)
categoryRouter.get('/:categoryId', showCategoryById)


export default categoryRouter
