import Comment from '../../models/Comment'

const deleteCommentQuery = async (commentId: number): Promise<boolean> => {
  const deletedComment = await Comment.destroy({ where: { commentId } })

  return deletedComment > 0
}

export default deleteCommentQuery
