import { type NextFunction, type Response } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import { getUserQuery } from '../../queries/user'
import { getAllCategoriesQuery } from '../../queries/category'

const checkAuth = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const user = await getUserQuery(userId)
    const categories = await getAllCategoriesQuery()
    res.json({
      user,
      categories
    })
  } catch (error) {
    next(error)
  }
}

export default checkAuth
