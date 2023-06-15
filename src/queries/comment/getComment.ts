import CustomError from '../../helpers/CustomError'
import { type IComment } from '../../interfaces/models'
import { Comment, User } from '../../models'

const getCommentQuery = async (commentId: number): Promise<IComment | null> => {
  try {
    const comment = await Comment.findOne({
      where: {
        comment_id: commentId
      },
      include: [
        {
          model: User,
          attributes: ['fullName', 'userImage']
        }]
    })

    return comment
  } catch (error) {
    throw new CustomError(500, 'Error retrieving comment')
  }
}

export default getCommentQuery
