import { type NextFunction, type Response } from 'express'
import { addBookmarksQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'

const addBookmarks = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const { postId } = req.params
    const id = Number(postId)
    if (id < 0 || Number.isNaN(id)) {
      throw new CustomError(400, 'Bad Request')
    } else {
      const data = await addBookmarksQuery(userId, id)
      if (data[1]) {
        res.status(201).json({
          message: 'Bookmark added successfully',
          data: data[0]
        })
      } else {
        res.json({
          message: 'Post already bookmarked',
          data: data[0]
        })
      }
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default addBookmarks
