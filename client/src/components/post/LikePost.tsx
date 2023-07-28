import {
  Dispatch, SetStateAction, useContext, useEffect, useState,
} from 'react';
import { Heart } from 'iconsax-react';
import axios from 'axios';
import { message } from 'antd';
import Box from '../commons/Box';
import Paragraph from '../commons/Paragraph';
import { AuthContext } from '../context/AuthContext';
import PostLikers from './PostLikers';

interface Props {
  likesCount: number
  postId:number
  SetLikes:Dispatch<SetStateAction<number>>
}
const LikePost:React.FC<Props> = ({ likesCount, SetLikes, postId }:Props) => {
  const [showLike, setShowLike] = useState(false);
  const { userData } = useContext(AuthContext);
  const [showLikers, setShowLikers] = useState(false);
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
      } else {
        message.error('You need to be logged in first');
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

      <Paragraph className="pointer" onClick={() => { setShowLikers(true); }}>
        {likesCount}
        {' '}
        Like
      </Paragraph>
      {showLikers ? <PostLikers setShowLikers={setShowLikers} showLikers={showLikers} postId={postId} /> : null}
    </Box>
  );
};
export default LikePost;
