import CustomError from '../helpers/CustomError'
// const { verifyToken } = require('../utils/helpers/authToken')
import { type Request, type Response, type NextFunction } from 'express'
const authUser = (req: Request, _res: Response, next: NextFunction): void => {
  const { token } = req.cookies
  if (token) {
    verifyToken(token)
      .then((user) => {
        req.user = user
        next()
      })
      .catch((err) => {
        next(err)
      })
  } else {
    next(new CustomError(401, 'unauthorized'))
  }
}
module.exports = authUser
