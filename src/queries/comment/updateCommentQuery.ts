import Comment from '../../models/Comment'
import { type IComment } from '../../interfaces/models'

const updateCommentQuery = async (commentId: number, commentText: string): Promise<IComment | null> => {
  const comment = await Comment.findByPk(commentId)

  if (comment != null) {
    comment.commentText = commentText
    await comment.save()

    return comment
  }

  return null
}

export default updateCommentQuery
