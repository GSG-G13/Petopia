import Category from '../../models/Category'
import { type ICategory } from '../../interfaces/models'

const getAllCategoriesQuery = async (): Promise<ICategory[]> => {
  const categories = await Category.findAll(
    { attributes: ['categoryId', 'title'] }
  )

  return categories
}

export default getAllCategoriesQuery
