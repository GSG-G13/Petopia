import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import Image from '../commons/Image';
import formatTime from '../../helpers/timeFormatter';
import Box from '../commons/Box';

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

const Comment: React.FC<Props> = ({ showComments, comment }: Props) => (
  <Box style={{ display: showComments ? 'flex' : 'none', transitionDelay: 'display 5s' }} className="comment-div">
    <Image src={comment.user.userImage} height="40px" width="40px" className="user-img" alt="user avatar" />
    <Box className="comment-content">
      <Box className="comment-div">
        <Link to={`userId:${comment.userId}`} className="username">{comment.user.fullName}</Link>
        <Paragraph className="date">{formatTime(comment.createdAt)}</Paragraph>
      </Box>
      <Paragraph className="post-content">{comment.commentText}</Paragraph>
    </Box>
  </Box>
);
export default Comment;
