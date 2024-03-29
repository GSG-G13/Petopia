import React, {
  Dispatch, SetStateAction, useContext, useState,
} from 'react';
import { Card, Space } from 'antd';
import { Link } from 'react-router-dom';
import Image from '../commons/Image';
import '../../styles/post-card.css';
import Carousel from '../commons/Carousel';
import PostButtons from './PostButtons';
import PostComments from './PostComment';
import PostDetails from './PostDetails';
import formatTime from '../../helpers/timeFormatter';
import { IComment, IPost } from '../../interfaces';
import Label from './Label';
import Box from '../commons/Box';
import Paragraph from '../commons/Paragraph';
import CommentForm from './CommentForm';
import { AuthContext } from '../context/AuthContext';
import PostActions from './PostAction';

interface Props {
  post: IPost
  posts:IPost[]
  setPosts:Dispatch<SetStateAction<IPost[]>>
}
const PostCard: React.FC<Props> = ({ post, posts, setPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentsCounts, setCommentsCounts] = useState(post.commentsCount);
  const [likesCount, SetLikes] = useState(post.likesCount);
  const { userData } = useContext(AuthContext);
  return (
    <Space direction="vertical" size={16}>
      <Card className="card">
        <Box className="post-header">
          <Box className="user-post-container">
            <Image
              src={post.user.userImage}
              height="40px"
              width="45px"
              className="user-img"
              alt="user avatar"
            />
            <Box className="user-post-info">
              <Box className="name-div">
                <Link to={`/profile/${post.userId}`} className="username">{post.user.fullName}</Link>
                <PostActions
                  posts={posts}
                  setPosts={setPosts}
                  post={post}
                  commentsCounts={commentsCounts}
                  likesCount={likesCount}
                  userId={userData.userId}
                  userType={userData.userType}
                  userPost={post.userId}
                  postId={post.postId}
                />
              </Box>
              <Paragraph className="date">{formatTime(post.createdAt)}</Paragraph>
            </Box>
          </Box>
          <Label title={post.category.title} />
        </Box>
        {post.postImages && <Carousel images={post.postImages} /> }
        {post.postContent && (
        <Paragraph className="post-content">
          {post.postContent}
        </Paragraph>
        )}

        {(post.pets !== undefined || post.products !== undefined)
          ? <PostDetails petDetails={post.pets[0]} productDetails={post.products[0]} /> : null}
        <PostButtons
          showComments={showComments}
          setShowComments={setShowComments}
          phoneNumber={post.user.phone}
          postId={post.postId}
          likesCount={likesCount}
          SetLikes={SetLikes}
          commentsCount={commentsCounts}
          adoption={post.pets !== undefined && post.pets.length !== 0}
          product={post.products !== undefined && post.products.length !== 0}
        />

        <PostComments
          showComments={showComments}
          postId={post.postId}
          setComments={setComments}
          comments={comments}
          setCommentsCounts={setCommentsCounts}
        />

        {userData.userId !== 0
          ? <CommentForm postId={post.postId} setComments={setComments} setCommentsCounts={setCommentsCounts} /> : null}
      </Card>
    </Space>
  );
};
export default PostCard;
