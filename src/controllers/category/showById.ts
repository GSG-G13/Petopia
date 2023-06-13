import { type Request, type Response, type NextFunction } from 'express'
import { getCategoryById } from '../../queries/category/showById'
import * as yup from 'yup'
import CustomError from '../../helpers/CustomError'

const showCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId } = req.params

    const schema = yup.object().shape({
      categoryId: yup.number().required()
    })

    try {
      await schema.validate({ categoryId })
    } catch (error: unknown) {
      next(new CustomError(400, 'Validation Error'))
      return
    }

    const category = await getCategoryById(Number(categoryId))

    if (category != null) {
      res.json({
        data: category
      })
    } else {
      next(new CustomError(404, 'Category not found'))
    }
  } catch (error: unknown) {
    next(new CustomError(500, 'Server Error'))
  }
}
 
export { showCategoryById }
