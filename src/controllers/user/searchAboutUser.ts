import { type NextFunction, type Request, type Response } from 'express'
import { searchAboutUserQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { validateFullName } from '../../validation'
const searchAboutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit } = req.query
    const { fullName }: { fullName: string } = await validateFullName.validate(req.query)

    let fullNameStr: string | undefined
    if (typeof fullName === 'string') {
      fullNameStr = fullName
    } else if (Array.isArray(fullName)) {
      fullNameStr = fullName[0]
    }

    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    if (pageNumber < 0 || Number.isNaN(pageNumber) ||
      limitNumber < 0 || Number.isNaN(limitNumber)) {
      throw new CustomError(400, 'Bad Request')
    }

    if (limitNumber >= 101) throw new CustomError(400, 'limit should not be more than 100')

    const users = await searchAboutUserQuery(pageNumber, limitNumber, fullNameStr)

    res.json({
      message: 'Data Retrieved Successfully',
      data: users
    })
  } catch (err) {
    next(err)
  }
}

export default searchAboutUser
