import { type Request, type Response } from 'express'
import { getCategoryById } from '../../queries/category/showById'

const showCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params

    const category = await getCategoryById(Number(categoryId))

    if (category != null) {
      res.json({
        data: category
      })
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' })
  }
}

export { showCategoryById }
