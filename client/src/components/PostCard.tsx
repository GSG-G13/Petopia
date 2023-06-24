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

const { Paragraph } = Typography;

const PostCard: React.FC = () => {
    const [showComments, setShowComments] = useState(false);
    const [showLike, setShowLike] = useState(false);
    const post = {
        postId: 1,
        userId: 1,
        categoryId: 1,
        postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam error alias saepe dolores. Aliquam, ipsam magnam minus blanditiis qui doloremque vel, quo, esse natus ipsa aut placeat ullam tempora eius.",
        isHaveImg: true,
        likesCount: 2,
        commentsCount: 3,
        createdAt: "2023-06-24T12:51:15.220Z",
        updatedAt: "2023-06-24T12:54:26.372Z",
        postImages: [
            {
                imageId: 1,
                postId: 1,
                imageUrl: "https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg",
                createdAt: "2023-06-24T12:51:15.224Z",
                updatedAt: "2023-06-24T12:51:15.224Z"
            },
            {
                imageId: 3,
                postId: 1,
                imageUrl: "https://cdn.discordapp.com/attachments/1113720733860888597/1121405280366899304/IMG_20201117_134403.jpg",
                createdAt: "2023-06-24T12:51:15.224Z",
                updatedAt: "2023-06-24T12:51:15.224Z"
            },
            {
                imageId: 4,
                postId: 1,
                imageUrl: "https://i.imgur.com/KcYHnFr.jpg",
                createdAt: "2023-06-24T12:51:15.224Z",
                updatedAt: "2023-06-24T12:51:15.224Z"
            },
            {
                imageId: 5,
                postId: 1,
                imageUrl: "https://i.imgur.com/v5xOSq2.jpg",
                createdAt: "2023-06-24T12:51:15.224Z",
                updatedAt: "2023-06-24T12:51:15.224Z"
            }
        ],
        "category": {
            "title": "Adoption"
        },
        "user": {
            "userId": 1,
            "fullName": "Haitham Abu Lamdi",
            "userImage": "https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg",
            "phoneNumber": 599888888
        },
        "products": [],
        "pets": [
            {
                "petId": 2,
                "petName": "Bella",
                "age": 2,
                "gender": "Female",
                "healthStatus": "Vaccinated",
                "adoptionStatus": "Adopted",
                "petType": {
                    "typeId": 2,
                    "title": "Cat"
                }
            }
        ]
    }
    const comments = [
        {
            "commentId": 1,
            "userId": 1,
            "postId": 1,
            "commentText": "Great post!",
            "createdAt": "2023-06-24T12:51:15.227Z",
            "updatedAt": "2023-06-24T12:51:15.227Z",
            "user": {
                fullName: "Abdallah Abujazar",
                userImage: "https://i.imgur.com/KcYHnFr.jpg"
            }
        },
        {
            "commentId": 2,
            "userId": 2,
            "postId": 1,
            "commentText": "Nice work!",
            "createdAt": "2023-06-24T12:51:15.227Z",
            "updatedAt": "2023-06-24T12:51:15.227Z",
            "user": {
                fullName: "Mohammed Sallout",
                userImage: "https://i.imgur.com/v2v02Ge.jpg"
            }
        },
        {
            "commentId": 4,
            "userId": 1,
            "postId": 1,
            "commentText": "test for this post.",
            "createdAt": "2023-06-24T12:54:26.385Z",
            "updatedAt": "2023-06-24T12:54:26.385Z",
            "user": {
                "fullName": "Abdallah Abujazar",
                "userImage": "https://i.imgur.com/KcYHnFr.jpg"
            }
        }
    ]
    return <Space direction="vertical" size={16}>
        <Card className='card'>
            <div className='post-header'>
                <div className='user-post-container'>
                    <Image src={"https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg"}
                        height="40px" width="40px" className='user-img' />
                    <div className='user-post-info'>
                        <Link to={'user/' + post.userId} className='username'>{post.user.fullName}</Link>
                        <Paragraph className='date'>{formatTime(post.createdAt)}</Paragraph>
                    </div>
                </div>
                <div className='label'>
                    <div className='top-label'></div>
                    <p className='label-content'>{post.category.title}</p>
                    <div className='down-label'></div>
                </div>
            </div>
            <Carousel images={post.postImages} />
            {post.postContent !== null && post.postContent !== undefined ? <Paragraph className='post-content'>{post.postContent}</Paragraph> : <></>}

            {(post.pets !== null && post.pets !== undefined) || (post.products !== null && post.products !== undefined) ? <PostDetails petDetails={post.pets[0]} productDetails={post.products[0]} /> : <></>}
            <PostButtons
                showLike={showLike}
                setShowLike={setShowLike}
                showComments={showComments}
                setShowComments={setShowComments}
                phoneNumber={post.user.phoneNumber}
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