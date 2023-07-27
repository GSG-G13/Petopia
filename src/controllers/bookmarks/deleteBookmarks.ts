import { type NextFunction, type Response } from 'express'
import { deleteBookmarksQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'

const deleteBookmarks = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const { postId } = req.params
    const id = Number(postId)
    if (id < 0 || Number.isNaN(id)) {
      throw new CustomError(400, 'Bad Request')
    } else {
      const result = await deleteBookmarksQuery(userId, id)
      if (result > 0) {
        res.json({
          message: 'Bookmark deleted successfully',
          data: { userId, postId: id }
        })
      } else {
        res.json({
          message: 'You are not bookmarking this Post'
        })
      }
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default deleteBookmarks
