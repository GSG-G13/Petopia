import React, {
  Dispatch, useEffect, useState, SetStateAction,
} from 'react';
import {
  Space, Table, Popconfirm, Button, message, Modal, Form, Input,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';

interface DataType {
  categoryId: number;
  title: string;
}

type ContextType = {
  stats: { categoriesCount: number },
  countChanged: boolean,
  setCountChanged: Dispatch<SetStateAction<boolean>>
};

const Categories: React.FC = () => {
  const [cats, setCats] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const { stats: { categoriesCount }, countChanged, setCountChanged } = useOutletContext<ContextType>();

  useEffect(() => {
    setLoading(true);
    axios.get('/api/v1/categories')
      .then(({ data: { data } }) => {
        setLoading(false);
        setCats(data);
        setTotal(categoriesCount);
      }).catch((err) => {
        setLoading(false);
        if (axios.isAxiosError(err) && err.response?.status !== 401) {
          message.error(err?.response?.data.message || 'Something went wrong!');
        }
      });
  }, [page, countChanged]);

  const onFinish = async () => {
    try {
      const res = await axios.post('/api/v1/categories/', { title });

      if (res.data.message) {
        message.open({
          type: 'success',
          content: res.data.message,
        });
        setCountChanged(!countChanged);
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
    setLoading(true);
    axios.delete(`/api/v1/categories/${categoryId}`)
      .then((res) => {
        const updatedCats = cats.filter((cat) => cat.categoryId !== categoryId);
        setCountChanged(!countChanged);
        setCats(updatedCats);
        setLoading(false);
        message.open({
          type: 'success',
          content: res.data.message,
        });
      })
      .catch((err) => {
        setLoading(false);
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

export default Categories;
