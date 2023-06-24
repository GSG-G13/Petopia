import Comment from "./SingleComment"
interface Props {
    showComments: boolean
    comments: {
        commentId: number
        userId: number
        postId: number
        commentText: string
        createdAt: string
        user: {
            fullName: string
            userImage: string
        }
    }[]
}
const PostComments: React.FC<Props> = ({ showComments, comments }) => {
    const Comments = comments.map((comment, index) => <Comment key={index} showComments={showComments} comment={comment} />)
    return (
        <div className={showComments ? 'open-comments' : 'close-comments'} >
            {Comments}
        </div>
    )

}
export default PostComments  