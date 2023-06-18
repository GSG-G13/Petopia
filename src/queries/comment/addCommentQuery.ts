import Comment from '../../models/Comment'
import { type IComment } from '../../interfaces/models'

const addCommentQuery = async (userId: number, postId: number, commentText: string): Promise<IComment> => {
  const newComment = await Comment.create({ userId, postId, commentText })
  return newComment
}

export default addCommentQuery
