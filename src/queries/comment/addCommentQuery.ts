import Comment from '../../models/Comment'
import { type IComment } from '../../interfaces/models'
import sequelize from '../../database/config'
import { Post } from '../../models'
import CustomError from '../../helpers/CustomError'

const addCommentQuery = async (userId: number, postId: number, commentText: string): Promise<IComment> => {
  const transaction = await sequelize.transaction()
  try {
    await Post.increment('commentsCount', {
      by: 1,
      where: { postId },
      transaction
    })

    const newComment = await Comment.create({ userId, postId, commentText })

    await transaction.commit()

    return newComment
  } catch (error) {
    await transaction.rollback()
    throw new CustomError(500, 'Error occurred while adding follow')
  }
}

export default addCommentQuery
