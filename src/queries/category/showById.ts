import Category from '../../models/Category'
import { type ICategory } from '../../interfaces/models'

const getCategoryById = async (categoryId: number): Promise<ICategory | null> => {
  const category = await Category.findByPk(categoryId)

  return category
}

export { getCategoryById }
