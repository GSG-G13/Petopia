import React, { useEffect, useState } from 'react';
import {
  Space, Table, Input, Popconfirm, Button, message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/v1/posts?page=${page}`)
      .then(({ data: { data } }) => {
        if (page === 1) setTotal(data[0].postId);
        setLoading(false);
        setPosts(data);
        setList(data);
      })
      .catch((err) => {
        setLoading(false);
        if (axios.isAxiosError(err) && err.response?.status !== 401) {
          message.error(err?.response?.data.message || 'Something went wrong!');
        }
      });
  }, [page]);

  const handleSearch = (value: string) => {
    setSearchName(value);
    if (value === '') {
      setPosts(list);
    } else {
      const filteredPosts = list.filter((post) => post.postContent.toLowerCase().includes(value.toLowerCase()));
      setPosts(filteredPosts);
    }
  };

  const handleDelete = (postId: number) => {
    axios.delete(`/api/v1/posts/${postId}`)
      .then((res) => {
        const updatedPosts = posts.filter((post) => post.postId !== postId);
        setPosts(updatedPosts);
        setList(updatedPosts);
        message.open({
          type: 'success',
          content: res.data.message,
        });
      })
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response?.status !== 401) {
          message.error(err?.response?.data.message || 'Something went wrong!');
        }
      });
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'postId',
      key: 'id',
    },
    {
      title: 'Content',
      dataIndex: 'postContent',
      key: 'content',
      render: (text: string, record: DataType) => (
        <Link to={`/post/${record.postId}`} target="_blank">
          {text}
        </Link>
      ),
    },
    {
      title: 'Username',
      dataIndex: ['user', 'fullName'],
      key: 'username',
    },
    {
      title: 'Tag',
      dataIndex: ['category', 'title'],
      key: 'tag',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: DataType) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the post"
            description="Are you sure to delete this post?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.postId)}
          >
            <Button danger>
              <Link to="/dashboard/posts">Delete</Link>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = posts.map((post) => ({
    key: post.postId,
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
          className="search"
          placeholder="Search in post content..."
          onSearch={handleSearch}
          enterButton
          value={searchName}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '350px' }}
        />
      </div>
      <Table
        className="table-list"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          pageSize: 10,
          total,
          onChange: (pageNumber) => setPage(pageNumber),
        }}
      />
    </>
  );
};

export default Posts;
