import { type NextFunction, type Request, type Response } from 'express'
import { getAllUsersQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'

const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit } = req.query
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    if (pageNumber < 0 || Number.isNaN(pageNumber) ||
      limitNumber < 0 || Number.isNaN(limitNumber)) {
      throw new CustomError(400, 'Bad Request.')
    }
    if (limitNumber >= 101) throw new CustomError(400, 'limit should not be more than 100')
    const users = await getAllUsersQuery(pageNumber, limitNumber)
    res.json({
      message: 'Users Retrieved Successfully',
      data: users
    })
  } catch (error) {
    next(error)
  }
}

export default getAllUsers
