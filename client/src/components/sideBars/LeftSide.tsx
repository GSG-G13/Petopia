import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Card, Typography, Divider,
  Menu,
} from 'antd';

import {
  HomeOutlined,
  SearchOutlined,
  BellOutlined,
  MessageOutlined,
  BookOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import UsersModal from './UsersModal';
import ImageComponent from '../commons/Image';
import { AuthContext } from '../context/AuthContext';
import '../../styles/profile.css';
import Box from '../commons/Box';
import AddNewPostSideBar from '../addPost/AddNewPostSideBar';
import FollowingCountContext from '../context/FollowingCountContext';

const { Item } = Menu;
const LeftSide = () => {
  const { Title, Text } = Typography;
  const { userData } = useContext(AuthContext);
  const [normalPostModal, setNormalPostModal] = useState(false);
  const [type, setType] = useState('');
  const { followingCount, setFollowingCount } = useContext(FollowingCountContext);
  const showNormalPostModal = () => {
    setNormalPostModal(true);
  };

  const hideNormalPostModal = () => {
    setNormalPostModal(false);
  };

  return (
    <Box style={{ height: '100vh' }}>
      { userData.userId === 0 ? null
        : (
          <>
            <Card
              style={{
                maxWidth: 400, marginTop: 16, top: 0, border: 'none',
              }}
              loading={false}
            >
              <Box style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px',
              }}
              >
                <ImageComponent
                  src={userData.userImage}
                  height="96px"
                  width="96px"
                  alt="imgg"
                  className="user-img-profile"
                />
              </Box>
              <Title level={2} style={{ textAlign: 'center', fontSize: '26px' }}>{userData.fullName}</Title>
              <Divider />
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box onClick={() => {
                  setType(() => 'followers');
                  showNormalPostModal();
                }}
                >
                  <Title level={4} className="pointer">{userData.followerCount}</Title>
                  <Text className="pointer" type="secondary">Followers</Text>
                </Box>
                <Divider type="vertical" style={{ height: '60px' }} />
                <Box
                  onClick={() => {
                    setType(() => 'followings');
                    showNormalPostModal();
                  }}
                >
                  <Title level={4} className="pointer">{followingCount}</Title>
                  <Text className="pointer" type="secondary">Following</Text>
                </Box>
              </Box>
            </Card>
            {normalPostModal ? (
              <UsersModal
                visible={normalPostModal}
                onClose={hideNormalPostModal}
                userId={userData.userId}
                loggedId={userData.userId}
                type={type}
                setFollowingCount={setFollowingCount}
              />
            ) : null}
          </>
        )}
      <Menu
        mode="vertical"
        className="menu"
        style={{
          border: 'none', fontSize: 20, marginBottom: 20, maxWidth: 400, padding: '5px',
        }}

      >
        <Item key="home" style={{ marginBottom: '10px' }} icon={<HomeOutlined style={{ fontSize: '18px' }} />}>
          <NavLink to="/">
            Feed
          </NavLink>

        </Item>
        <Item key="explore" style={{ marginBottom: '10px' }} icon={<SearchOutlined style={{ fontSize: '18px' }} />}>
          <NavLink
            to="explore"
            // className={({ isActive, isPending }) => (
            //   isActive? 'actives': isPending? 'pending': '')}
          >
            Explore
          </NavLink>

        </Item>
        <Item
          key="notifications"
          style={{ marginBottom: '10px' }}
          icon={<BellOutlined style={{ fontSize: '18px' }} />}
        >
          Notifications

        </Item>
        <Item
          key="messages"
          style={{ marginBottom: '10px' }}
          icon={<MessageOutlined style={{ fontSize: '18px' }} />}
        >
          Messages

        </Item>
        <Item
          key="bookmarks"
          style={{ marginBottom: '10px' }}
          icon={<BookOutlined style={{ fontSize: '18px' }} />}
        >
          Bookmarks

        </Item>
        <Item
          key="products"
          style={{ marginBottom: '10px' }}
          icon={<DownOutlined style={{ fontSize: '18px' }} />}
        >
          Products

        </Item>
        <Item
          key="profile"
          style={{ marginBottom: '10px' }}
          icon={<UserOutlined style={{ fontSize: '18px' }} />}
        >
          {' '}
          <NavLink
            to={`/profile/${userData.userId}`}
            // className={({ isActive, isPending }) => (
            //   isActive? 'actives': isPending
            //       ? 'pending'
            //       : '')}
          >
            Profile

          </NavLink>
        </Item>
      </Menu>

      <AddNewPostSideBar />
    </Box>
  );
};

export default LeftSide;
