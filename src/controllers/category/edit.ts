import { type Request, type Response } from 'express'
import { editCategory } from '../../queries/category/edit'
import { type ICategory } from '../../interfaces/models'

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params
    const { title } = req.body

    const updatedCategory: ICategory | null = await editCategory(Number(categoryId), title)

    if (updatedCategory != null) {
      res.json({
        message: 'Category updated successfully',
        data: updatedCategory
      })
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' })
  }
}

export { updateCategory }
