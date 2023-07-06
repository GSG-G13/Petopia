import {
  Dropdown, MenuProps, message,
} from 'antd';
import { More } from 'iconsax-react';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import Box from '../commons/Box';
import { IPost } from '../../interfaces';

interface Props {
  userId:number
  userPost:number
  postId:number
  posts:IPost[]
  setPosts:Dispatch<SetStateAction<IPost[]>>
  userType:string
}
const deletePost = async (
  postId:number,
  posts:IPost[],
  setPosts:Dispatch<SetStateAction<IPost[]>>,

) => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`);
    const newPosts = posts.filter((post) => post.postId !== postId);
    setPosts(newPosts);
    message.success('Post deleted successfully');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status !== 401) {
      message.error('Something went wrong!');
    }
  }
};

// const EditPost = (
//   setEditable:Dispatch<SetStateAction<boolean>>,

// ) => {
//   setEditable(true);
// };

const PostActions:React.FC<Props> = ({
  userPost, userId, postId, posts, setPosts, userType,
}:Props) => {
  if (userPost === userId || userType === 'admin') {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
        //   <Box onClick={() => EditComment()}>
        //     Edit
        //   </Box>
          <Box>
            Edit
          </Box>
        ),
      },
      {
        key: '2',
        label: (
          <Box onClick={() => deletePost(postId, posts, setPosts)}>
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
export default PostActions;
