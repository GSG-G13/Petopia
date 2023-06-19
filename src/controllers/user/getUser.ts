import { type NextFunction, type Request, type Response } from 'express'
import { getUserQuery } from '../../queries/user'
import CustomError from '../../helpers/CustomError'
import { validateUserId } from '../../validation'

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = await validateUserId.validate(req.params)
    const data = await getUserQuery(Number(userId))
    if (data !== null) {
      res.json({ data })
    } else {
      next(new CustomError(404, 'user not found'))
    }
  } catch (err) {
    next(err)
  }
}
export default getUser
