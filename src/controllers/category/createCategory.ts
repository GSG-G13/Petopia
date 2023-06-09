import { type Request, type Response, type NextFunction } from 'express'
import { addCategoryQuery } from '../../queries'
import { type ICategory } from '../../interfaces/fakeDataTypes'
import { validateTitle } from '../../validation'

const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title }: ICategory = await validateTitle.validate(req.body, { abortEarly: false })

    const newCategory = await addCategoryQuery(title)

    res.status(201).json({
      message: 'Category Created Successfully',
      data: newCategory
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default createCategory
