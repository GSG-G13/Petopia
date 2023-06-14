import { type Request, type Response, type NextFunction } from 'express'
import { deleteCategoryById } from '../../queries/category/delete'
import * as yup from 'yup'
import CustomError from '../../helpers/CustomError'
import { type ICategory } from '../../interfaces/fakeDataTypes'

export type { ICategory }

const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const schema = yup.object().shape({
      categoryId: yup.number().required()
    })

    const { categoryId }: { categoryId: number } = await schema.validate(req.params)

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
      throw new CustomError(404, 'Category not found')
    }
  } catch (error: unknown) {
    next(error)
  }
}

export { deleteCategory }
