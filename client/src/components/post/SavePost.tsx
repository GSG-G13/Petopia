import {
  useContext, useEffect, useState,
} from 'react';
import { Archive } from 'iconsax-react';
import axios from 'axios';
import { message } from 'antd';
import Box from '../commons/Box';
import Paragraph from '../commons/Paragraph';
import { AuthContext } from '../context/AuthContext';

interface Props {
  postId:number
}
const SavePost:React.FC<Props> = ({ postId }:Props) => {
  const [showSaved, setShowSaved] = useState(false);
  const { userData } = useContext(AuthContext);
  const checkSaved = async (id:number) => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/bookmarks/bookmarkers/${id}`);
      const found = data.filter((bookmark: { userId: number; }) => bookmark.userId === userData.userId).length !== 0;
      if (found) {
        setShowSaved(!showSaved);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  useEffect(() => {
    checkSaved(postId);
  }, []);
  const savingPost = async (id:number) => {
    try {
      await axios.post(`/api/v1/bookmarks/${id}`);
      setShowSaved(!showSaved);
      message.success('This post is in your bookmarks now');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      } else {
        message.error('You need to be logged in first');
      }
    }
  };
  const unSavePost = async (id:number) => {
    try {
      await axios.delete(`/api/v1/bookmarks/${id}`);
      setShowSaved(!showSaved);
      message.success('This post is no longer in your bookmarks');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  return (
    <Box className="item">
      {showSaved
        ? (
          <Archive
            className="icon"
            variant="Bold"
            color="#F37F29"
            onClick={() => unSavePost(postId)}
          />
        )
        : (
          <Archive
            className="icon"
            variant="Outline"
            color="black"
            onClick={() => savingPost(postId)}
          />
        ) }

      <Paragraph className="pointer">
        {showSaved ? 'Saved' : 'Save'}
      </Paragraph>
    </Box>
  );
};
export default SavePost;
