import { type Request, type Response, type NextFunction } from 'express'
import { editCategory } from '../../queries/category/edit'
import { type ICategory } from '../../interfaces/models'
import * as yup from 'yup'
import CustomError from '../../helpers/CustomError'

const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId } = req.params

    const schema = yup.object().shape({
      title: yup.string().required().trim()
    })

    try {
      await schema.validate(req.body)
    } catch (error: unknown) {
      res.status(400).json({ error: 'Validation Error', details: (error as yup.ValidationError).errors })
      return
    }

    const { title } = req.body

    const updatedCategory: ICategory | null = await editCategory(Number(categoryId), title)

    if (updatedCategory != null) {
      res.json({
        message: 'Category updated successfully',
        data: updatedCategory
      })
    } else {
      throw new CustomError(404, 'Category not found')
    }
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ error: error.message })
    } else {
      next(error)
    }
  }
}

export { updateCategory }
