import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import PostCard from './post/PostCard';
import { IPost } from '../interfaces';
import Box from './commons/Box';
import '../styles/posts.css';
import PostSkeleton from './post/PostSkeleton';

const ExplorePosts: React.FC = () => {
  const [explorePosts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: { data } } = await axios.get(`/api/v1/posts?page=${page}`);
      setPosts((prevData) => [...prevData, ...data]);
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
  }, [page]);

  const handleScroll = (event:React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget as HTMLDivElement;
    if (scrollTop + clientHeight === scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (loading ? (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  )
    : (
      <Box className="posts-container" onScroll={handleScroll}>
        {explorePosts.length !== 0
          ? explorePosts.map((post:IPost) => <PostCard key={post.postId} post={post} />) : [] }
      </Box>
    )

  );
};
export default ExplorePosts;
