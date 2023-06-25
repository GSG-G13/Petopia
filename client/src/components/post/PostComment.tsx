import Comment from "./SingleComment"
import Box from "../commons/Box"
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
        <Box className={showComments ? 'open-comments' : 'close-comments'} >
            {Comments}
        </Box>
    )

}
export default PostComments  