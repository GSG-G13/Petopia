import Comment from '../../models/Comment'
import sequelize from '../../database/config'
import { Post } from '../../models'
import CustomError from '../../helpers/CustomError'

const deleteCommentQuery = async (commentId: number, postId: number): Promise<boolean> => {
  const transaction = await sequelize.transaction()
  try {
    await Post.decrement('commentsCount', {
      by: 1,
      where: { postId },
      transaction
    })

    const deletedComment = await Comment.destroy({ where: { commentId } })

    await transaction.commit()

    return deletedComment > 0
  } catch (error) {
    await transaction.rollback()
    throw new CustomError(500, 'Error occurred while adding follow')
  }
}

export default deleteCommentQuery
