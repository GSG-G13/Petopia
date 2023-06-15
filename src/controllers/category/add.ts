import { type Request, type Response, type NextFunction } from 'express'
import addCategory from '../../queries/category/add'
import createCategoryValidation from '../../validation/category/add'
import { type ICategory } from '../../interfaces/fakeDataTypes'

const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title }: ICategory = await createCategoryValidation.validate(req.body, { abortEarly: false })

    const newCategory = await addCategory(title)

    res.status(201).json({
      message: 'Category created successfully',
      data: newCategory
    })
  } catch (err: unknown) {
    next(err)
  }
}

export { createCategory }
