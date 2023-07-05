import {
  Dropdown, MenuProps, message,
} from 'antd';
import { More } from 'iconsax-react';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import Box from '../commons/Box';
import { IComment } from '../../interfaces';

interface Props {
  userComment:number
  userId:number
  CommentId:number
  comments:IComment[]
  setComments:Dispatch<SetStateAction<IComment[]>>
  setCommentsCounts:Dispatch<SetStateAction<number>>
  setEditable:Dispatch<SetStateAction<boolean>>

}
const deleteComment = async (
  CommentId:number,
  comments:IComment[],
  setComments:Dispatch<SetStateAction<IComment[]>>,
  setCommentsCounts:Dispatch<SetStateAction<number>>,
) => {
  try {
    await axios.delete(`/api/v1/comments/${CommentId}`);
    setCommentsCounts((pre) => pre - 1);
    const newComments = comments.filter((comment) => comment.commentId !== CommentId);
    setComments(newComments);

    message.success('Comment deleted successfully');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status !== 401) {
      message.error('Something went wrong!');
    }
  }
};

const EditComment = (
  setEditable:Dispatch<SetStateAction<boolean>>,

) => {
  setEditable(true);
};

const CommentActions:React.FC<Props> = ({
  userComment, userId, CommentId, comments, setComments, setCommentsCounts, setEditable,
}:Props) => {
  if (userComment === userId) {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <Box onClick={() => EditComment(setEditable)}>
            Edit
          </Box>
        ),
      },
      {
        key: '2',
        label: (
          <Box onClick={() => deleteComment(CommentId, comments, setComments, setCommentsCounts)}>
            Delete
          </Box>
        ),
      }];
    return (
      <Dropdown menu={{ items }} placement="bottomLeft">
        <More size="25" color="#FF8A65" className="pointer" />
      </Dropdown>
    );
  }
  return null;
};
export default CommentActions;
