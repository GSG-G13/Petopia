import { type NextFunction, type Response } from 'express'
import { getBookmarksQuery } from '../../queries'
import { type CustomRequest } from '../../interfaces/iAuth'

const getBookmarks = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const bookmarks = await getBookmarksQuery(userId)
    res.json({
      message: 'Bookmarks Retrieved Successfully',
      data: bookmarks
    })
  } catch (err) {
    next(err)
  }
}

export default getBookmarks
