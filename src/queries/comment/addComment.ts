import Comment from '../../models/Comment'
import { type IComment } from '../../interfaces/models'
import CustomError from '../../helpers/CustomError'
const addCommentQuery = async ({
  userId,
  postId,
  commentText
}: IComment): Promise<IComment | null> => {
  try {
    // const { userId, postId, commentText } = commentData
    const comment = await Comment.create({
      userId,
      postId,
      commentText
    })
    return comment
  } catch (error) {
    throw new CustomError(500, 'Error when create comment query')
  }
}
export default addCommentQuery
