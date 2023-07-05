import React, { useEffect, useState } from 'react';
import { Space, Table, Input } from 'antd';
import { Link } from 'react-router-dom';

interface DataType {
  postId: number;
  user: {
    fullName: string;
  };
  postContent: string;
  category: {
    title: string;
  };
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<DataType[]>([]);
  const [searchName, setSearchName] = useState('');
  const [list, setList] = useState<DataType[]>([]);

  const fakeDataUrl = 'http://localhost:5173/api/v1/posts';

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setPosts(res.data);
        setList(res.data);
      });
  }, []);

  const handleSearch = (value: string) => {
    setSearchName(value);
    if (value === '') {
      setPosts(list);
    } else {
      const filteredPosts = list.filter((post) => post.user.fullName.toLowerCase().includes(value.toLowerCase()));
      setPosts(filteredPosts);
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: ['user', 'fullName'],
      key: 'username',
      render: (text: string) => <Link to="/user">{text}</Link>,
    },
    {
      title: 'Content',
      dataIndex: 'postContent',
      key: 'content',
    },
    {
      title: 'Tag',
      dataIndex: ['category', 'title'],
      key: 'tag',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Link to="delete">Delete</Link>
        </Space>
      ),
    },
  ];

  const data: DataType[] = posts.map((post) => ({
    postId: post.postId,
    user: {
      fullName: post.user.fullName,
    },
    postContent: post.postContent,
    category: {
      title: post.category.title,
    },
  }));

  return (
    <>
      <div>
        <Input.Search
          placeholder="Search by name..."
          onSearch={handleSearch}
          enterButton
          value={searchName}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '350px' }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 6,
          total: data.length,
        }}
      />
    </>
  );
};

export default Posts;
