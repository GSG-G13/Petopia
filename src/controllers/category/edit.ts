import { type Request, type Response, type NextFunction } from 'express'
import { editCategory } from '../../queries/category/edit'
import { type ICategory } from '../../interfaces/models'
import CustomError from '../../helpers/CustomError'
import { editTitleValidation, editIDValidation } from '../../validation/category/edit'
const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId }: { categoryId: number } = await editIDValidation.validate(req.params)

    try {
      await editIDValidation.validate(req.params)
    } catch (error: unknown) {
      next(error)
    }

    const { title }: { title: string } = await editTitleValidation.validate(req.body, { abortEarly: false })

    const updatedCategory: ICategory | null = await editCategory(Number(categoryId), title)

    if (updatedCategory != null) {
      res.json({
        message: 'Category Updated Successfully',
        data: updatedCategory
      })
    } else {
      throw new CustomError(404, 'Category not found')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export { updateCategory }
