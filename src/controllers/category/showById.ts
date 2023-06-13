import { type Request, type Response } from 'express'
import { getCategoryById } from '../../queries/category/showById'
import * as yup from 'yup'

const showCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params

    const schema = yup.object().shape({
      categoryId: yup.number().required()
    })

    try {
      await schema.validate({ categoryId })
    } catch (error: unknown) {
      res.status(400).json({ error: 'Validation Error', details: (error as yup.ValidationError).errors })
      return
    }

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
