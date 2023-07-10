import React, { useEffect, useState } from 'react';
import {
  Space, Table, Input, Popconfirm, Button, message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface DataType {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  userType: string;
  status: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [searchName, setSearchName] = useState('');
  const [list, setList] = useState<DataType[]>([]);

  const fakeDataUrl = 'http://localhost:5173/api/v1/users';

  useEffect(() => {
    axios.get(fakeDataUrl)
      .then((res) => res.data)
      .then((res) => {
        setUsers(res.data.sort((a: any, b: any) => a.userId - b.userId));
        setList(res.data.sort((a: any, b: any) => a.userId - b.userId));
      });
  }, []);

  const handleSearch = (value: string) => {
    setSearchName(value);
    if (value === '') {
      setUsers(list);
    } else {
      const filteredUsers = list.filter((user) => user.fullName.toLowerCase().includes(value.toLowerCase()));
      setUsers(filteredUsers);
    }
  };

  const handleStatus = (userStatus: string, userId: number) => {
    const newStatus = userStatus === 'active' ? 'deactive' : 'active';
    axios.patch(`http://localhost:5173/api/v1/users/${userId}`, { status: newStatus })
      .then((res) => {
        const updatedUsers = users.map((user) => (user.userId === userId ? { ...user, status: newStatus } : user));
        setUsers(updatedUsers);
        setList(updatedUsers);
        message.success(res.data.message);
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string, record: DataType) => (
        <Link to={`/profile/${record.userId}`} target="_blank">
          {text}
        </Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Type',
      dataIndex: 'userType',
      key: 'tag',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'action',
      render: (text: string, record: DataType) => (
        <Space size="middle">
          <Popconfirm
            title={`Are you sure to ${text === 'active' ? 'deactive' : 'active'} this user?`}
            onConfirm={() => handleStatus(text, record.userId)}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button danger>
              {text === 'active' ? 'deactive' : 'active'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = users.map((user) => ({
    key: user.email,
    userId: user.userId,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    userType: user.userType,
    status: user.status,
  }));

  return (
    <>
      <div>
        <Input.Search
          className="search"
          placeholder="Search by name..."
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
        pagination={{
          pageSize: 6,
          total: data.length,
        }}
      />
    </>
  );
};

export default Users;
