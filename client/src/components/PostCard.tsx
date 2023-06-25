import React, { useState } from 'react';
import { Card, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Image from './Image';
import '../styles/post-card.css'
import Carousel from './Carousel';
import PostButtons from './PostButtons';
import PostComments from './PostComment';
import CommentForm from './CommentForm';
import PostDetails from './PostDetails';
import formatTime from '../helpers/timeFormater';
import { IPost } from '../interfaces';

import fakeData from '../helpers/fakeData.json'
import Label from './Label';

const { Paragraph } = Typography;
interface Props {
    post: IPost
}
const PostCard: React.FC<Props> = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const [showLike, setShowLike] = useState(false);

    const comments = fakeData.comments;

    return <Space direction="vertical" size={16}>
        <Card className='card'>
            <div className='post-header'>
                <div className='user-post-container'>
                    <Image src={"https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg"}
                        height="40px" width="40px" className='user-img' alt='user avatar' />
                    <div className='user-post-info'>
                        <Link to={'user/' + post.userId} className='username'>{post.user.fullName}</Link>
                        <Paragraph className='date'>{formatTime(post.createdAt)}</Paragraph>
                    </div>
                </div>
                {/* <div className='label'>
                    <div className='top-label' style={{backgroundColor:}}></div>
                    <p className='label-content'>{post.category.title}</p>
                    <div className='down-label'></div>
                </div> */}
                <Label title={post.category.title} />
            </div>
            {(post.postImages !== null && post.postImages !== undefined) ? <Carousel images={post.postImages} /> : <></>}

            {post.postContent !== null && post.postContent !== undefined ? <Paragraph className='post-content'>{post.postContent}</Paragraph> : <></>}

            {(post.pets !== undefined || post.products !== undefined)
                ? <PostDetails petDetails={post.pets[0]} productDetails={post.products[0]} /> : <></>}
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
    </Space >
}
export default PostCard