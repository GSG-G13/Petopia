import { type Request, type Response, type NextFunction } from 'express'
import { getAllCategoriesQuery } from '../../queries'

const showAllCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await getAllCategoriesQuery()

    res.json({
      data: categories
    })
  } catch (error: unknown) {
    next(error)
  }
}

export default showAllCategories
