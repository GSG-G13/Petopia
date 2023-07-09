import {
  Card, Typography, Divider, Dropdown, Button,
  Menu,
} from 'antd';
import { MessageAdd1 } from 'iconsax-react';
import {
  HomeOutlined,
  SearchOutlined,
  BellOutlined,
  MessageOutlined,
  BookOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useContext, useState } from 'react';
import UsersModal from './UsersModal';
import ImageComponent from '../commons/Image';
import { AuthContext } from '../context/AuthContext';
import '../../styles/profile.css';
import Box from '../commons/Box';

const { Item } = Menu;
const LeftSide = () => {
  const { Title, Text } = Typography;
  const { userData } = useContext(AuthContext);
  const [normalPostModal, setNormalPostModal] = useState(false);
  const [type, setType] = useState('');
  const [followingCount, setFollowingCount] = useState(userData.followingCount);
  const showNormalPostModal = () => {
    setNormalPostModal(true);
  };

  const hideNormalPostModal = () => {
    setNormalPostModal(false);
  };

  const items = [
    {
      key: '1',
      label: 'Post',
    },
    {
      key: '2',
      label: 'Adoption',
    },
    {
      key: '3',
      label: 'Product',
    },
  ];
  return (
    <>
      { userData.userId === 0 ? null
        : (
          <>
            <Card
              style={{
                maxWidth: 300, marginTop: 16, top: 0, border: 'none',
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
              <Title level={2} style={{ textAlign: 'center' }}>{userData.fullName}</Title>
              <Divider />
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* <Box>
      <Title level={4}>586</Title>
      <Text type="secondary">Posts</Text>
    </Box> */}
                {/* <Divider type="vertical" style={{ height: '60px' }} /> */}
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
                  <Title level={4}>{followingCount}</Title>
                  <Text type="secondary">Following</Text>
                </Box>
              </Box>
            </Card>
            {normalPostModal ? (
              <UsersModal
                visible={normalPostModal}
                onClose={hideNormalPostModal}
                userId={userData.userId}
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
          border: 'none', fontSize: 17, marginBottom: 20, maxWidth: 300,
        }}
      >
        <Item key="home" icon={<HomeOutlined />}>Home</Item>
        <Item key="explore" icon={<SearchOutlined />}>Explore</Item>
        <Item key="notifications" icon={<BellOutlined />}>Notifications</Item>
        <Item key="messages" icon={<MessageOutlined />}>Messages</Item>
        <Item key="bookmarks" icon={<BookOutlined />}>Bookmarks</Item>
        <Item key="products" icon={<DownOutlined />}>Products</Item>
        <Item key="profile" icon={<UserOutlined />}>Profile</Item>
      </Menu>
      <Dropdown menu={{ items }}>
        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: '150px', backgroundColor: '#F37F29', fontSize: '16px', width: 207.386,
          }}
        >
          <MessageAdd1 size="20" color="#fff" />
          <span style={{ marginLeft: '16px', borderRight: '2px solid #fff', paddingRight: '10px' }}>Create Post</span>
          <DownOutlined style={{ fontWeight: 'bold' }} />
        </Button>
      </Dropdown>
    </>
  );
};

export default LeftSide;
