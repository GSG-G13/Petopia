import { type Request, type Response } from 'express'
import { deleteCategoryById } from '../../queries/category/delete'
import * as yup from 'yup'

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params

    const schema = yup.object().shape({
      categoryId: yup.number().required()
    })

    try {
      await schema.validate({ categoryId })
    } catch (error: unknown) {
      res.status(400).json({ error: 'Validation Error', details: (error as yup.ValidationError).errors })
      return
    }

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
