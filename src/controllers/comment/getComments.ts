import { type NextFunction, type Request, type Response } from 'express'
import { getCommentsQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'

const getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { postId } = req.params
  const id = Number(postId)

  try {
    const { page, limit } = req.query
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 5
    if (pageNumber < 0 || Number.isNaN(pageNumber) ||
      limitNumber < 0 || Number.isNaN(limitNumber)) {
      throw new CustomError(400, 'Bad Request')
    }
    if (limitNumber >= 51) throw new CustomError(400, 'limit should not be more than 50')

    const comments = await getCommentsQuery(id, pageNumber, limitNumber)
    res.json({
      message: 'Comments Retrieved Successfully',
      data: comments
    })
  } catch (error) {
    next(error)
  }
}

export default getComments
