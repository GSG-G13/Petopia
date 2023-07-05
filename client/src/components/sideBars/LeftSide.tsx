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

const { Item } = Menu;
const LeftSide = () => {
  const { Title, Text } = Typography;
  const { userData } = useContext(AuthContext);
  const [normalPostModal, setNormalPostModal] = useState(false);
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
      <UsersModal visible={normalPostModal} onClose={hideNormalPostModal} />
      { userData.userId === 0 ? null
        : (
          <Card
            style={{
              maxWidth: 300, marginTop: 16, top: 0, border: 'none',
            }}
            loading={false}
          >
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px',
            }}
            >
              <ImageComponent
                src={userData.userImage}
                height="96px"
                width="96px"
                alt="imgg"
                className="user-img"
              />

            </div>
            <Title level={2} style={{ textAlign: 'center' }}>{userData.fullName}</Title>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Title level={4}>586</Title>
                <Text type="secondary">Posts</Text>
              </div>
              <Divider type="vertical" style={{ height: '60px' }} />
              <div>
                <Title level={4} onClick={showNormalPostModal}>15.4K</Title>
                <Text type="secondary">Followers</Text>
              </div>
              <Divider type="vertical" style={{ height: '60px' }} />
              <div>
                <Title level={4}>648</Title>
                <Text type="secondary">Following</Text>
              </div>
            </div>
          </Card>
        )}
      {/* <Card
        style={{
          maxWidth: 300, marginTop: 16, border: 'none', padding: 0, marginBottom: 15,
        }}
        loading={false}
      > */}
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
      {' '}

      {/* </Card> */}
    </>
  );
};

export default LeftSide;
