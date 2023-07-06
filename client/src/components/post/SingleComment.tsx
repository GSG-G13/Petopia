import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import {
  Dispatch, SetStateAction, useContext, useState,
} from 'react';
import Image from '../commons/Image';
import formatTime from '../../helpers/timeFormatter';
import Box from '../commons/Box';
import { AuthContext } from '../context/AuthContext';
import CommentActions from './CommentAction';
import { IComment } from '../../interfaces';
import EditCommentForm from './EditCommentForm';

interface Props {
  showComments: boolean
  comment: IComment
  comments:IComment[]
  setComments:Dispatch<SetStateAction<IComment[]>>
  setCommentsCounts:Dispatch<SetStateAction<number>>
}

const { Paragraph } = Typography;

const Comment: React.FC<Props> = ({
  showComments, comment, comments, setComments, setCommentsCounts,
}: Props) => {
  const { userData } = useContext(AuthContext);
  const [editable, setEditable] = useState(false);
  const [commentText, setCommentText] = useState(comment.commentText);
  return (
    <Box style={{ display: showComments ? 'flex' : 'none', transitionDelay: 'display 5s' }} className="comment-div">
      <Image src={comment.user.userImage} height="40px" width="40px" className="user-img" alt="user avatar" />
      <Box className="comment-content">
        <Box className="comment-div-1">
          <Box className="comment-div">
            <Link to={`/profile/${comment.userId}`} className="username">{comment.user.fullName}</Link>
            <Paragraph className="date">{formatTime(comment.createdAt)}</Paragraph>
          </Box>

          <CommentActions
            userComment={comment.userId}
            userId={userData.userId}
            CommentId={comment.commentId}
            comments={comments}
            setComments={setComments}
            setCommentsCounts={setCommentsCounts}
            setEditable={setEditable}
          />
        </Box>
        {editable
          ? (
            <EditCommentForm
              commentId={comment.commentId}
              setEditable={setEditable}
              commentText={commentText}
              setCommentText={setCommentText}
            />
          )
          : <Paragraph className="post-content">{commentText}</Paragraph> }

      </Box>
    </Box>
  );
};
export default Comment;
