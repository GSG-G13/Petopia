import Category from '../../models/Category'

const deleteCategoryById = async (categoryId: number): Promise<boolean> => {
  const deletedCategory = await Category.destroy({ where: { categoryId } })

  return deletedCategory > 0
}

export { deleteCategoryById }
