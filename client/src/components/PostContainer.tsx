import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Empty, message } from 'antd';
import PostCard from './post/PostCard';
import { IPost } from '../interfaces';
import Box from './commons/Box';
import '../styles/posts.css';
import PostSkeleton from './post/PostSkeleton';
import UserProfile from './userProfile/UserProfile';
import AddNewPost from './addPost/AddNewPost';
import NoMorePosts from './NoMorePosts';

interface Props {
  path: string
}

const PostContainer : React.FC<Props> = ({ path }: Props) => {
  const { id, postId } = useParams();
  const userId = Number(id);
  const [explorePosts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);
  let apiLink = `/api/v1/posts?page=${page}`;
  switch (path) {
    case 'explore': apiLink = `/api/v1/posts?page=${page}`;
      break;
    case 'feed': apiLink = `/api/v1/posts/feed?page=${page}`;
      break;
    case 'profile': apiLink = `/api/v1/users/${userId}/posts?page=${page}`;
      break;
    case 'post':
      apiLink = `/api/v1/posts/${postId}`;
      break;
    default: apiLink = `/api/v1/posts?page=${page}`;
  }
  const fetchData = async () => {
    try {
      if (page === 1) {
        setLoading(true);
      }
      const { data: { data } } = await axios.get(apiLink);
      if (page === 1) {
        if (path === 'post') {
          setPosts([data]);
        } else {
          setPosts(data);
        }
      } else {
        setPosts((prevData) => [...prevData, ...data]);
      }
      if (page > 1 && data.length === 0) {
        setScrollEnd(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    } finally {
      setScrollLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setScrollEnd(false);
  }, [path, userId]);

  useEffect(() => {
    fetchData();
  }, [page, path, userId]);

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
        {path === 'profile' ? <UserProfile userId={userId} /> : null}
        {path === 'feed' || path === 'explore' ? <AddNewPost /> : null}
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
              description="There are no posts yet, You need to follow users to view their posts"
              style={{
                display: 'flex',
                transitionDelay: 'display 5s',
                justifyContent: 'center',
                width: '400px',
                height: '400px',
              }}
            />
          ) }
        {scrollEnd ? <NoMorePosts /> : scrollLoading && <PostSkeleton /> }
      </Box>
    )

  );
};
export default PostContainer;
