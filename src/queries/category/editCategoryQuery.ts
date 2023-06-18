import Category from '../../models/Category'
import { type ICategory } from '../../interfaces/models'

const editCategoryQuery = async (categoryId: number, title: string): Promise<ICategory | null> => {
  const category = await Category.findByPk(categoryId)

  if (category != null) {
    category.title = title
    await category.save()

    return category
  }

  return null
}

export default editCategoryQuery
