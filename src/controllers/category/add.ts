import { type Request, type Response, type NextFunction } from 'express'
import addCategory from '../../queries/category/add'
import CustomError from '../../helpers/CustomError'
import * as yup from 'yup'

const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title } = req.body

    const schema = yup.object().shape({
      title: yup.string().required('Title is required')
    })

    await schema.validate({ title }, { abortEarly: false })

    const newCategory = await addCategory(title)

    
    res.json({
      message: 'Category created successfully',
      data: newCategory
    })
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      next(new CustomError(400, 'Validation Error'))
    } else {
      next(new CustomError(500, 'Server Error'))
    }
  }
}

export { createCategory }
