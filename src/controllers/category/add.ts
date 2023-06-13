import { type Request, type Response, type NextFunction } from 'express'
import addCategory from '../../queries/category/add'
import CustomError from '../../helpers/CustomError'
import { addCategoryVal } from '../../validation/category/add'
import * as Yup from 'yup'

const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await addCategoryVal(req.body)

    const { title } = req.body

    const newCategory = await addCategory(title)

    res.json({
      message: 'Category created successfully',
      data: newCategory
    })
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const validationErrors = error.errors.map((err: string) => ({
        message: err
      }))
      res.status(400).json({ error: 'Validation Error', details: validationErrors })
    } else {
      next(new CustomError(500, 'Server Error'))
    }
  }
}

export { createCategory }
