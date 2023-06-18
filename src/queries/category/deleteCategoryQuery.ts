import Category from '../../models/Category'

const deleteCategoryQuery = async (categoryId: number): Promise<boolean> => {
  const deletedCategory = await Category.destroy({ where: { categoryId } })

  return deletedCategory > 0
}

export default deleteCategoryQuery
