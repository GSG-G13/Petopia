import { Link } from "react-router-dom"
import Image from "./Image"
import { Typography } from "antd"
import formatTime from "../helpers/timeFormater"

interface Props {
    showComments: boolean
    comment: {
        commentId: number
        userId: number
        postId: number
        commentText: string
        createdAt: string
        user: {
            fullName: string
            userImage: string
        }
    }
}

const { Paragraph } = Typography;

const Comment: React.FC<Props> = ({ showComments, comment }) => {
    return (
        <div style={{ display: showComments ? 'flex' : 'none', transitionDelay: 'display 5s' }} className='comment-div'>
            <Image src={comment.user.userImage} height="40px" width="40px" className='user-img' />
            <div className='comment-content'>
                <div className='comment-div'>
                    <Link to={'userId:' + comment.userId} className='username'>{comment.user.fullName}</Link>
                    <Paragraph className='date'>{formatTime(comment.createdAt)}</Paragraph>
                </div>
                <Paragraph className='post-content'>{comment.commentText}</Paragraph>
            </div>
        </div>
    )
}
export default Comment  