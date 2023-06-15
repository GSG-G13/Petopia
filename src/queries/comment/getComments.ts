import CustomError from '../../helpers/CustomError'
import { Comment, User } from '../../models'

const getCommentsQuery = async (postId: number): Promise<object> => {
  try {
    const comments = await Comment.findAll({
      where: {
        post_id: postId
      },
      include: [
        {
          model: User,
          attributes: ['fullName', 'userId']
        }]
    })

    return comments
  } catch (error) {
    throw new CustomError(500, 'Error retrieving comments')
  }
}

export default getCommentsQuery
