import { type NextFunction, type Request, type Response } from 'express'
import { getUserQuery } from '../../queries/user'
import CustomError from '../../helpers/CustomError'

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params
  let data = await getUserQuery(Number(userId))
  data = data.toJSON()
  if (data !== null) {
    res.json({ error: false, data })
  } else {
    next(new CustomError(404, 'user not found'))
  }
}
export default getUser
