import { type Request, type Response, type NextFunction } from 'express'
import { editCategoryQuery } from '../../queries'
import { type ICategory } from '../../interfaces/models'
import CustomError from '../../helpers/CustomError'
import { validateCategoryId, validateTitle } from '../../validation'

const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId }: { categoryId: number } = await validateCategoryId.validate(req.params)

    const { title }: { title: string } = await validateTitle.validate(req.body, { abortEarly: false })

    const updatedCategory: ICategory | null = await editCategoryQuery(Number(categoryId), title)

    if (updatedCategory != null) {
      res.json({
        message: 'Category Updated Successfully',
        data: updatedCategory
      })
    } else {
      throw new CustomError(400, 'The Category Was Not Found')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default updateCategory
