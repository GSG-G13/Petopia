import React, { useEffect, useState } from 'react';
import { Space, Table, Input } from 'antd';
import { Link } from 'react-router-dom';

interface DataType {
  fullName: string;
  email: string;
  phone: string;
  userType: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [searchName, setSearchName] = useState('');
  const [list, setList] = useState<DataType[]>([]);

  const fakeDataUrl = 'http://localhost:5173/api/v1/users';

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.data);
        setList(res.data);
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

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string) => <Link to="/user">{text}</Link>,
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
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Link to="deactive">De-active</Link>
        </Space>
      ),
    },
  ];

  const data: DataType[] = users.map((user) => ({
    key: user.email,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    userType: user.userType,
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

export default Users;
