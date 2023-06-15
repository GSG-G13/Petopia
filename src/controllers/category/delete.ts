import { type Request, type Response, type NextFunction } from 'express'
import { deleteCategoryById } from '../../queries/category/delete'
import CustomError from '../../helpers/CustomError'
import { type ICategory } from '../../interfaces/fakeDataTypes'
import { validateCategoryId } from '../../validation'

export type { ICategory }

const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId }: { categoryId: number } = await validateCategoryId.validate(req.params)

    const deletedCategory = await deleteCategoryById(Number(categoryId))

    if (deletedCategory) {
      res.json({
        message: 'Category Deleted Successfully',
        data: deletedCategory
      })
    } else {
      throw new CustomError(400, 'The Category Was Not Found')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export { deleteCategory }
