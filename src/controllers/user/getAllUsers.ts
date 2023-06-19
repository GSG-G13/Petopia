import { type NextFunction, type Request, type Response } from 'express'
import { getAllUsersQuery } from '../../queries'

const getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await getAllUsersQuery()
    res.json({
      message: 'Users Retrieved Successfully',
      data: users
    })
  } catch (error) {
    next(error)
  }
}

export default getAllUsers
