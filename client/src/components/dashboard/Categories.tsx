import React, { useEffect, useState } from 'react';
import {
  Space, Table, Popconfirm, Button, message, Modal, Form, Input,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface DataType {
  categoryId: number;
  title: string;
}

const Categories: React.FC = () => {
  const [cats, setCats] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('/api/v1/categories')
      .then((res) => res.data)
      .then((res) => {
        setCats(res.data.sort((a: any, b: any) => a.categoryId - b.categoryId));
      });
  }, []);

  const onFinish = async () => {
    try {
      const res = await axios.post('/api/v1/categories/', { title });

      if (res.data.message) {
        message.open({
          type: 'success',
          content: res.data.message,
        });
        setCats([...cats, res.data.data]);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status !== 401) {
        message.error(err?.response?.data.message || 'Something went wrong!');
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onFinish();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (categoryId: number) => {
    axios.delete(`/api/v1/categories/${categoryId}`)
      .then((res) => {
        const updatedCats = cats.filter((cat) => cat.categoryId !== categoryId);
        setCats(updatedCats);
        // setList(updatedCats);
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
      dataIndex: 'categoryId',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: DataType) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.categoryId)}
          >
            <Button danger>
              <Link to="/dashboard/categories">Delete</Link>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = cats.map((cat) => ({
    key: cat.categoryId,
    categoryId: cat.categoryId,
    title: cat.title,
  }));

  return (
    <>
      <Button type="primary" onClick={showModal} className="add-cat">
        Add Category
      </Button>
      <Modal title="Add New Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your category!' }]}
          >
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
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

export default Categories;
