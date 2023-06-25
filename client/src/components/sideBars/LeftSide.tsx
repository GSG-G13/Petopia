import { Card, Typography, Divider, Dropdown } from 'antd';
import { Menu } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  BellOutlined,
  MessageOutlined,
  BookOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';

const { Item } = Menu;

const LeftSide = () => {
  const { Title, Text } = Typography;


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
      <Card style={{ width: 300, marginTop: 16 }} loading={false}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px'}}>
          <img src='https://media.discordapp.net/attachments/1112051630985187378/1122311524611014697/b0024e89-4665-4146-970c-cb2d4eccdea2.png?width=370&height=375' style={{height: 80, width: 80}}/>
        </div>
        <Title level={2} style={{ textAlign: 'center' }}>Mohammad</Title>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <Title level={4}>586</Title>
            <Text type="secondary">Posts</Text>
          </div>
          <Divider type="vertical" style={{ height: '60px'}} />
          <div>
            <Title level={4}>15.4K</Title>
            <Text type="secondary">Followers</Text>
          </div>
          <Divider type="vertical" style={{ height: '60px'}} />
          <div>
            <Title level={4}>648</Title>
            <Text type="secondary">Following</Text>
          </div>
        </div>
      </Card>

      <Card style={{ width: 300, marginTop: 16 }} loading={false}>
        <Menu mode="vertical" className="menu">
          <Item key="home" icon={<HomeOutlined />}>Home</Item>
          <Item key="explore" icon={<SearchOutlined />}>Explore</Item>
          <Item key="notifications" icon={<BellOutlined />}>Notifications</Item>
          <Item key="messages" icon={<MessageOutlined />}>Messages</Item>
          <Item key="bookmarks" icon={<BookOutlined />}>Bookmarks</Item>
          <Item key="products" icon={<DownOutlined />}>Products</Item>
          <Item key="profile" icon={<UserOutlined />}>Profile</Item>
        </Menu>
        <Dropdown.Button menu={{ items}} size='large' className='reatePost'>Create Post</Dropdown.Button>
      </Card>
    </>
  );
};

export default LeftSide;
