import { useContext, useEffect, useState } from 'react';
import { Heart } from 'iconsax-react';
import axios from 'axios';
import { message } from 'antd';
import Box from '../commons/Box';
import Paragraph from '../commons/Paragraph';
import { AuthContext } from '../context/AuthContext';

interface Props {
  likesCount: number
  postId:number
}
const LikePost:React.FC<Props> = ({ likesCount, postId }:Props) => {
  const [Likes, SetLikes] = useState(likesCount);
  const [showLike, setShowLike] = useState(false);
  const { userData } = useContext(AuthContext);
  const checkLikes = async (id:number) => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/like/likers/${id}`);
      const found = data.filter((liker: { userId: number; }) => liker.userId === userData.userId).length !== 0;
      if (found) {
        setShowLike(!showLike);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  useEffect(() => {
    checkLikes(postId);
  }, []);
  const likingPost = async (id:number) => {
    try {
      await axios.post('/api/v1/like', { postId: id });
      SetLikes((pre) => pre + 1);
      setShowLike(!showLike);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  const unlikePost = async (id:number) => {
    try {
      await axios.delete('/api/v1/like', { data: { postId: id } });
      SetLikes((pre) => pre - 1);
      setShowLike(!showLike);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  return (
    <Box className="item">
      {showLike
        ? (
          <Heart
            className="icon"
            variant="Bold"
            color="red"
            onClick={() => unlikePost(postId)}
          />
        )
        : (
          <Heart
            className="icon"
            variant="Outline"
            color="black"
            onClick={() => likingPost(postId)}
          />
        ) }

      <Paragraph className="pointer">
        {Likes}
        {' '}
        Like
      </Paragraph>
    </Box>
  );
};
export default LikePost;
