import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Empty, message } from 'antd';
import PostCard from './post/PostCard';
import { IPost } from '../interfaces';
import Box from './commons/Box';
import '../styles/posts.css';
import PostSkeleton from './post/PostSkeleton';

interface Props {
  path: string
}

const PostContainer : React.FC<Props> = ({ path }: Props) => {
  const { id } = useParams();
  const [explorePosts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  let apiLink = `/api/v1/posts?page=${page}`;
  switch (path) {
    case 'explore': apiLink = `/api/v1/posts?page=${page}`;
      break;
    case 'feed': apiLink = `/api/v1/posts/feed?page=${page}`;
      break;
    case 'profile': apiLink = `/api/v1/users/${id}/posts?page=${page}`;
      break;
    default: apiLink = `/api/v1/posts?page=${page}`;
  }
  const fetchData = async () => {
    try {
      if (page === 1) {
        setLoading(true);
      }
      const { data: { data } } = await axios.get(apiLink);
      setPosts(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    } finally {
      setScrollLoading(false);
      setLoading(false);
    }
  };

  const fetchPagesData = async () => {
    try {
      const { data: { data } } = await axios.get(apiLink);
      setPosts((prevData) => [...prevData, ...data]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    } finally {
      setScrollLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [path, id]);

  useEffect(() => {
    if (page === 1) {
      fetchData();
    } else if (page > 1) {
      fetchPagesData();
    }
  }, [page]);

  const handleScroll = (event:React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget as HTMLDivElement;
    if (scrollTop + clientHeight === scrollHeight) {
      setScrollLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (loading ? (
    <Box className="posts-container">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </Box>
  )
    : (
      <Box className="posts-container" onScroll={handleScroll}>
        <Link to="/explore">Explore</Link>
        <Link to="/feed">Feed</Link>
        {explorePosts.length !== 0
          ? explorePosts.map((post:IPost) => (
            <PostCard
              key={post.postId}
              post={post}
              posts={explorePosts}
              setPosts={setPosts}
            />
          )) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="There are no posts yet"
              style={{
                display: 'flex',
                transitionDelay: 'display 5s',
                justifyContent: 'center',
                width: '400px',
                height: '400px',
              }}
            />
          ) }
        {scrollLoading && <PostSkeleton /> }
      </Box>
    )

  );
};
export default PostContainer;
