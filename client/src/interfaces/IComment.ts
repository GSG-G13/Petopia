interface IComment {
  commentId: number
  userId: number
  postId: number
  commentText: string
  createdAt: string
  updatedAt: string
  user: {
    fullName: string
    userImage: string
  }
}
export default IComment;
