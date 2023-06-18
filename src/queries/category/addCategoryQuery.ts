import Category from '../../models/Category'
import { type ICategory } from '../../interfaces/models'

const addCategoryQuery = async (title: string): Promise<ICategory> => {
  const newCategory = await Category.create({ title })
  return newCategory
}

export default addCategoryQuery
