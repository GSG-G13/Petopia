import { type Request, type Response } from 'express'
import { deleteCategoryById } from '../../queries/category/delete'

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params

    const deletedCategory = await deleteCategoryById(Number(categoryId))

    if (deletedCategory) {
      res.json({
        message: 'Category deleted successfully',
        data: deletedCategory
      })
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' })
  }
}

export { deleteCategory }
