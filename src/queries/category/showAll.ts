import Category from '../../models/Category'
import { type ICategory } from '../../interfaces/models'

const getAllCategories = async (): Promise<ICategory[]> => {
  const categories = await Category.findAll()

  return categories
}

export { getAllCategories }
