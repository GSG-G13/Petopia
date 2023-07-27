import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import type { MenuProps } from 'antd/es/menu';
import UsersModal from './UsersModal';
import ImageComponent from '../commons/Image';
import { AuthContext } from '../context/AuthContext';
import '../../styles/profile.css';
import Box from '../commons/Box';
import AddNewPostSideBar from '../addPost/AddNewPostSideBar';
import FollowingCountContext from '../context/FollowingCountContext';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  className?: string,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    className,
  } as MenuItem;
}

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
  const location = useLocation();
  const items: MenuItem[] = [
    getItem(
      userData.userType === 'admin' ? (
        <Link to="/">Dashboard</Link>) : (<Link to="/">Feed</Link>),
      '1',
      <HomeOutlined style={{ fontSize: '18px' }} />,
    ),
    getItem(
      <Link to="/explore">Explore</Link>,
      '2',
      <SearchOutlined style={{ fontSize: '18px' }} />,
      undefined,
      'item-menu',
    ),
    getItem(<Link to="/notifications">Notifications</Link>, '3', <BellOutlined style={{ fontSize: '18px' }} />),
    getItem(<Link to="/messages">Messages</Link>, '4', <MessageOutlined style={{ fontSize: '18px' }} />),
    getItem(<Link to="/bookmarks">Bookmarks</Link>, '5', <BookOutlined style={{ fontSize: '18px' }} />),
    getItem(<Link to="/products">Products</Link>, '7', <DownOutlined style={{ fontSize: '18px' }} />),
    getItem(
      <Link to={`/profile/${userData.userId}`}>Profile</Link>,
      '8',
      <UserOutlined style={{ fontSize: '18px' }} />,
    ),
  ];
  const selectedKeys = items
    .filter((item: any) => item.label.props.to === location.pathname)
    .map((item: any) => item.key);

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
        selectedKeys={selectedKeys}
        items={items}
        className="dash-menu"
        style={{
          border: 'none', fontSize: 20, marginBottom: 20, maxWidth: 500, padding: '5px',
        }}
      />
      <AddNewPostSideBar />
    </Box>
  );
};

export default LeftSide;
/**
 *         {userData.userType === 'admin' ? (
          <Item key="dashboard" icon={<HomeOutlined />}>
            <NavLink to="/">
              Dashboard
            </NavLink>

          </Item>
        ) : (
          <Item key="home" icon={<HomeOutlined />}>
            <NavLink to="/">
              Feed
            </NavLink>

          </Item>
        )}
 */
