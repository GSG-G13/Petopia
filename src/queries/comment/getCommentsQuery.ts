import CustomError from '../../helpers/CustomError'
import { Comment, User } from '../../models'

const getCommentsQuery = async (postId: number, page: number, limit: number): Promise<object> => {
  try {
    const offset = (page - 1) * limit

    const comments = await Comment.findAll({
      where: {
        postId
      },
      include: [
        {
          model: User,
          attributes: ['fullName', 'userImage']
        }],
      limit,
      offset
    })

    return comments
  } catch (error) {
    throw new CustomError(500, 'Error retrieving comments')
  }
}

export default getCommentsQuery
