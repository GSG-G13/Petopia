import { type Request, type Response } from 'express'
import addCategory from '../../queries/category/add'

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body

    const newCategory = await addCategory(title)

    res.json({
      message: 'Category created successfully',
      data: newCategory
    })
  } catch (error) {
    res.status(500).json({ error: 'Server Error' })
  }
}

export { createCategory }
