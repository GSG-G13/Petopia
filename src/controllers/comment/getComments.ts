import { type NextFunction, type Request, type Response } from 'express'
import getCommentsQuery from '../../queries/comment/getComments'

const getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const postId = req.params.postId
  const id = Number(postId)

  try {
    const comments = await getCommentsQuery(id)
    res.json({
      message: 'Comments Retrieved Successfully',
      data: comments
    })
  } catch (error) {
    next(error)
  }
}

export default getComments
