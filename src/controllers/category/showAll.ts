import { type Request, type Response } from 'express'
import { getAllCategories } from '../../queries/category/showall'

const showAllCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getAllCategories()

    res.json({
      data: categories
    })
  } catch (error) {
    res.status(500).json({ error: 'Server Error' })
  }
}

export { showAllCategories }
