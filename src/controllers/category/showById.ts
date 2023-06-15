import { type Request, type Response, type NextFunction } from 'express'
import { getCategoryById } from '../../queries/category/showById'
import CustomError from '../../helpers/CustomError'
import byIdValidation from '../../validation/category/showById'

const showCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId }: { categoryId: number } = await byIdValidation.validate(req.params)

    const category = await getCategoryById(Number(categoryId))

    if (category != null) {
      res.json({
        data: category
      })
    } else {
      next(new CustomError(404, 'The Category Was Not Found'))
    }
  } catch (err: unknown) {
    next(err)
  }
}

export { showCategoryById }
