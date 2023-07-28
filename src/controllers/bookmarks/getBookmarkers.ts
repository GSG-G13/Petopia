import { type NextFunction, type Response } from 'express'
import { getBookmarkersQuery } from '../../queries'
import { type CustomRequest } from '../../interfaces/iAuth'

const getBookmarkers = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postId } = req.params
    const bookmarkers = await getBookmarkersQuery(+postId)
    res.json({
      message: 'Bookmarkers Retrieved Successfully',
      data: bookmarkers
    })
  } catch (err) {
    next(err)
  }
}

export default getBookmarkers
