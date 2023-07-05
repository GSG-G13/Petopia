import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import axios from 'axios';
import { Empty, message, Skeleton } from 'antd';
import Comment from './SingleComment';
import Box from '../commons/Box';
import { IComment } from '../../interfaces';

interface Props {
  showComments: boolean
  postId:number
  comments:IComment[]
  setComments:Dispatch<SetStateAction<IComment[]>>
  setCommentsCounts:Dispatch<SetStateAction<number>>
}
const PostComments: React.FC<Props> = ({
  showComments, postId, comments, setComments, setCommentsCounts,
}) => {
  const [commentsPage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: { data } } = await axios.get(`/api/v1/comments/posts/${postId}/?page=${commentsPage}`);
      setComments((prevData) => [...prevData, ...data]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [commentsPage]);

  const handleScroll = (event:React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget as HTMLDivElement;
    if (scrollTop + clientHeight === scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  let Comments;

  if (comments.length !== 0) {
    Comments = comments.map((comment) => (
      <Comment
        key={comment.commentId}
        showComments={showComments}
        comment={comment}
        comments={comments}
        setComments={setComments}
        setCommentsCounts={setCommentsCounts}
      />
    ));
  } else if (loading) {
    Comments = (
      <Skeleton
        active
        avatar
        paragraph={{ rows: 2 }}
        style={{
          display: showComments ? 'flex' : 'none',
          transitionDelay: 'display 5s',
          justifyContent: 'center',
          maxWidth: '400px',
        }}
      />
    );
  } else {
    Comments = (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="There are no comments yet"
        style={{ display: showComments ? 'flex' : 'none', transitionDelay: 'display 5s', justifyContent: 'center' }}
      />
    );
  }
  return (
    <>
      <Box className="hr" />
      <Box className={showComments ? 'open-comments' : 'close-comments'} onScroll={handleScroll}>
        {Comments}
      </Box>
    </>
  );
};
export default PostComments;
