import CustomError from '../helpers/CustomError'
import { type Response, type NextFunction } from 'express'
import { config } from 'dotenv'
import { verifyToken } from '../helpers/authToken'
import { type CustomRequest } from '../interfaces/iAuth'

config()

const authUser = async (req: CustomRequest, _res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.cookies
  if (token !== undefined) {
    try {
      const authenticatedUser = await verifyToken(token)
      req.user = authenticatedUser
      next()
    } catch (err) {
      next(err)
    }
  } else {
    next(new CustomError(401, 'unauthorized'))
  }
}
export default authUser
