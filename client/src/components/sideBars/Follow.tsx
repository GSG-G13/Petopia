import {
  Button, Row, Col, Typography, message, Empty,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FollowingCountContext from '../context/FollowingCountContext';
import { IFollow, IUser } from '../../interfaces';
import { AuthContext } from '../context/AuthContext';
import Box from '../commons/Box';
import ImageComponent from '../commons/Image';

const { Title } = Typography;

const Follow = (): JSX.Element => {
  const [followings, setFollowings] = useState<IFollow[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const { setFollowingCount } = useContext(FollowingCountContext);
  const { userData } = useContext(AuthContext);
  const fetchData = async (following:IFollow[]) => {
    try {
      const { data: { data } } = await axios.get('/api/v1/users/');
      let filteredUsers = data.filter((user:IUser) => !following.some((follow) => follow.followerId === user.userId));
      filteredUsers = filteredUsers.filter((user:IUser) => userData.userId !== user.userId);
      setUsers(() => filteredUsers);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };

  const getFollowings = async () => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/follow/followings/${userData.userId}`);
      setFollowings(data);
      fetchData(data);
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  useEffect(() => {
    getFollowings();
  }, []);

  const follow = async (userId:number) => {
    try {
      const { data: { data } } = await axios.post(`/api/v1/follow/followers/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => (user.userId !== userId)));
      setFollowings([...followings, data]);
      setFollowingCount((prev) => prev + 1);
      message.success('Followed successfully.');
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  return (
    <Box>
      <Title level={4} style={{ marginTop: 40, marginBottom: 16 }}>Who to follow</Title>
      <Box className="follow-container">

        {users.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="There are no more to follow"
            style={{ display: 'flex', transitionDelay: 'display 5s', justifyContent: 'center' }}
          />
        ) : users.map((user) => (
          <Row key={user.userId} style={{ marginBottom: 16, alignItems: 'center', maxWidth: '351px' }} align="middle">
            <Col flex="auto">
              <Box className="user-post-container likers">
                <ImageComponent
                  src={user.userImage}
                  height="50px"
                  width="50px"
                  className="user-img"
                  alt="user avatar"
                />
                <Link
                  to={`/profile/${user.userId}`}
                  className="username"
                  style={{ maxWidth: '175px', fontSize: '14px' }}
                >
                  {user.fullName}
                </Link>
              </Box>
            </Col>
            <Col>
              <Button
                type="dashed"
                shape="round"
                className="follow-button"
                style={{ margin: '10px' }}
                onClick={() => follow(user.userId)}
              >
                Follow
              </Button>
            </Col>
          </Row>
        ))}
      </Box>
    </Box>
  );
};

export default Follow;
