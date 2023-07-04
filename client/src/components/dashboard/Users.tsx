import React, { useEffect, useState } from 'react';
import {
  Avatar, Button, List, Skeleton,
} from 'antd';
import { Link } from 'react-router-dom';

interface DataType {
  fullName?: string;
  email?: string;
  userImage?: string;
  profileImage?: string;
  address?: string;
  phone?: string;
  userType?: string;
  status?: string;
  loading: boolean;
}

const Users: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);

  const count = 3;
  const fakeDataUrl = `http://localhost:5173/api/v1/users?limit=${count}&page=${page}`;

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.data);
        setList(res.data);
        setPage(page + 1);
      });
  }, []);

  const onLoadMore = () => {
    setPage(page + 1);
    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({ loading: true, fullName: '', userImage: '' }))),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.data);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMore = !initLoading && !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={
            [
              <Link to="/edit" key="list-loadmore-edit">edit</Link>,
              <Link to="/more" key="list-loadmore-more">more</Link>,
            ]
          }
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.userImage} />}
              title={<a href="https://ant.design">{item.fullName}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>{item.userType}</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Users;
