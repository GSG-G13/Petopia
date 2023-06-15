import { type Request, type Response, type NextFunction } from 'express'
import { getAllCategories } from '../../queries/category/showAll'

const showAllCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await getAllCategories()

    res.json({
      data: categories
    })
  } catch (error: unknown) {
    next(error)
  }
}

export { showAllCategories }
