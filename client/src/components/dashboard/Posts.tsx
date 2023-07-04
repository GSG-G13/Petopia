import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import CarouselComponent from '../commons/Carousel';

interface DataType {
  postContent?: string;
  likesCount: number;
  commentsCount: number;
  postImages: [];
  user: {
    fullName?: string;
    userImage?: string;
  }
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);

  const count = 3;
  const fakeDataUrl = `http://localhost:5173/api/v1/posts?limit=${count}&page=${page}`;

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setPosts(res.data);
        setPage(page + 1);
      });
  }, []);

  posts.map((item) => ({
    href: 'https://ant.design',
    title: item.user.fullName,
    avatar: item.user.userImage,
    content: item.postContent,
  }));
  console.log(posts.map((item) => ({
    href: 'https://ant.design',
    title: item.user.fullName,
    avatar: item.user.userImage,
    content: item.postContent,
    images: item.postImages,
  })));

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: () => {
          setPage(page + 1);
        },
        pageSize: 1,
      }}
      dataSource={posts}
      renderItem={(item) => (
        <List.Item
          key={item.user.fullName}
          actions={[
            <IconText icon={LikeOutlined} text={item.likesCount.toString()} key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text={item.commentsCount.toString()} key="list-vertical-message" />,
          ]}
          extra={(
            <CarouselComponent images={item.postImages} />
          )}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.user.userImage} />}
            title={<a href={item.href}>{item.user.fullName}</a>}
          />
          {item.postContent}
        </List.Item>
      )}
    />
  );
};

export default Posts;
