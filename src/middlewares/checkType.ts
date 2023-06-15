import { type Response, type NextFunction } from 'express'
import { config } from 'dotenv'

import CustomError from '../helpers/CustomError'
import { type CustomRequest } from '../interfaces/iAuth'
import { getUserQuery } from '../queries/user'

config()

export enum userTypes {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

const checkType = (authorizedTypes: userTypes[]) => async (req: CustomRequest, _res: Response, next: NextFunction) => {
  if (req.user == null) {
    throw new CustomError(401, 'Unauthorized')
  }
  const { userId } = req.user
  const user = await getUserQuery(userId)

  if (user === null) {
    next(new CustomError(402, 'User not found'))
  } else {
    // authorizedTypes.indexOf(user.userType) > -1
    if (authorizedTypes.includes(user.userType as userTypes)) {
      next()
    } else {
      console.log(user.userType as userTypes)
      console.log(authorizedTypes)
      next(new CustomError(403, 'Not enough permissions'))
    }
  }
}
export default checkType
