import { type Request, type Response, type NextFunction } from 'express'
import { deleteCategoryById } from '../../queries/category/delete'
import CustomError from '../../helpers/CustomError'
import { type ICategory } from '../../interfaces/fakeDataTypes'
import deleteCategoryValidation from '../../validation/category/delete'

export type { ICategory }

const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId }: { categoryId: number } = await deleteCategoryValidation.validate(req.params)

    const deletedCategory = await deleteCategoryById(Number(categoryId))

    if (deletedCategory) {
      res.json({
        message: 'Category deleted successfully',
        data: deletedCategory
      })
    } else {
      throw new CustomError(404, 'Category not found')
    }
  } catch (err: unknown) {
    next(err)
  }
}
 
export { deleteCategory }
