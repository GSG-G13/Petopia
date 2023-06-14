import { type Request, type Response, type NextFunction } from 'express'
import { editCategory } from '../../queries/category/edit'
import { type ICategory } from '../../interfaces/models'
import * as yup from 'yup'
import CustomError from '../../helpers/CustomError'

const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const schema = yup.object().shape({
      categoryId: yup.number().required()
    })

    const { categoryId }: { categoryId: number } = await schema.validate(req.params)

    try {
      await schema.validate(req.params)
    } catch (error: unknown) {
      next(error)
    }

    const schema2 = yup.object().shape({
      title: yup.string().required().trim()
    })

    const { title }: { title: string } = await schema2.validate(req.body, { abortEarly: false })

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
    next(error)
  }
}

export { updateCategory }
