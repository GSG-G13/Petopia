import Category from '../../models/Category'
import { type ICategory } from '../../interfaces/models'

const getAllCategoriesQuery = async (): Promise<ICategory[]> => {
  const categories = await Category.findAll()

  return categories
}

export default getAllCategoriesQuery
