import React, { useState } from 'react';
import { Card, Space } from 'antd';
import { Link } from 'react-router-dom';
import Image from '../commons/Image';
import '../../styles/post-card.css';
import Carousel from '../commons/Carousel';
import PostButtons from './PostButtons';
import PostComments from './PostComment';
import CommentForm from './CommentForm';
import PostDetails from './PostDetails';
import formatTime from '../../helpers/timeFormatter';
import IPost from '../../interfaces';
import fakeData from '../../helpers/fakeData.json';
import Label from './Label';
import Box from '../commons/Box';
import Paragraph from '../commons/Paragraph';

interface Props {
  post: IPost
}
const PostCard: React.FC<Props> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [showLike, setShowLike] = useState(false);

  const { comments } = fakeData;

  return (
    <Space direction="vertical" size={16}>
      <Card className="card">
        <Box className="post-header">
          <Box className="user-post-container">
            <Image
              src={post.user.userImage}
              height="40px"
              width="40px"
              className="user-img"
              alt="user avatar"
            />
            <Box className="user-post-info">
              <Link to={`user/${post.userId}`} className="username">{post.user.fullName}</Link>
              <Paragraph className="date">{formatTime(post.createdAt)}</Paragraph>
            </Box>
          </Box>
          <Label title={post.category.title} />
        </Box>
        {(post.postImages !== null && post.postImages !== undefined) ? <Carousel images={post.postImages} /> : null}

        {post.postContent !== null && post.postContent !== undefined ? (
          <Paragraph className="post-content">
            {post.postContent}
          </Paragraph>
        ) : null}

        {(post.pets !== undefined || post.products !== undefined)
          ? <PostDetails petDetails={post.pets[0]} productDetails={post.products[0]} /> : null}
        <PostButtons
          showLike={showLike}
          setShowLike={setShowLike}
          showComments={showComments}
          setShowComments={setShowComments}
          phoneNumber={post.user.phone}
          postID={post.postId}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          adoption={post.pets !== undefined && post.pets.length !== 0}
          product={post.products !== undefined && post.products.length !== 0}
        />
        <PostComments showComments={showComments} comments={comments} />
        <CommentForm userImage={post.user.userImage} />
      </Card>
    </Space>
  );
};
export default PostCard;