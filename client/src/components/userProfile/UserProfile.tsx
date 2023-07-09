/* eslint-disable max-len */
import {
  Button, Card, Avatar, Row, Col, Typography, Space, Badge,
} from 'antd';
import { LeftOutlined, BellOutlined } from '@ant-design/icons';
import { Location, CalendarAdd } from 'iconsax-react';
import { useState } from 'react';
import UsersModal from '../sideBars/UsersModal';
import { AuthContext } from '../context/AuthContext';
import '../../styles/profile.css';
import ImageComponent from '../commons/Image';

const { Title, Text } = Typography;

const UserProfile = () => {
  const iconWrapperStyle = {
    width: '50px',
    height: '50px',
    flexShrink: 0,
    borderRadius: '50px',
    border: '1px solid #F0F0F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
  };

  const iconStyle = {
    fontSize: '24px',
    color: '#0D161D',
  };
  const [normalPostModal, setNormalPostModal] = useState(false);
  const showNormalPostModal = () => {
    setNormalPostModal(true);
  };

  const hideNormalPostModal = () => {
    setNormalPostModal(false);
  };

  return (
    <>
      {/* <UsersModal visible={normalPostModal} onClose={hideNormalPostModal} /> */}

      <Card style={{ width: '100%', position: 'relative', height: '450px' }} bordered={false}>
        <Button type="link" icon={<LeftOutlined />}>Back</Button>
        <ImageComponent
          alt="Cover Photo"
          height="90px"
          width="100%"
          className=""
          src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=829&q=80"
        />
        <Row>

          <Col
            span={12}
            style={{
              textAlign: 'right', position: 'absolute', marginTop: 20, right: '40px',
            }}
          >
            <Space>
              <Badge dot offset={[-10, 10]}>
                <div style={iconWrapperStyle}>
                  <BellOutlined style={iconStyle} className="notification" />
                </div>
              </Badge>
              <Button
                type="primary"
                size="large"
                style={{
                  borderRadius: '150px', backgroundColor: '#F37F29', fontSize: '16px', width: 130,
                }}
              >
                Follow
              </Button>
            </Space>
          </Col>

          <Col span={12}>
            <Avatar
              size={100}
              src="https://media.discordapp.net/attachments/1112051630985187378/1122439026390073394/38308a08c26e275d9560bcbabeb74324.png?width=320&height=320"
              style={{
                marginTop: '-30px', marginLeft: 20, border: '2px solid white', zIndex: 1,
              }}
            />
            <Title level={3}>Mohammed Sallout</Title>
            <Col style={{ marginBottom: 15 }}>
              <Text>user Description</Text>
            </Col>

            <Col style={{ marginBottom: 15 }}>
              <Space>
                <Space>
                  <div style={iconWrapperStyle}>
                    <Location style={iconStyle} className="notification" />
                  </div>
                  <Text>address</Text>
                </Space>
                <Space>
                  <div style={iconWrapperStyle}>
                    <CalendarAdd style={iconStyle} className="notification" />
                  </div>
                  <Text>joinDate</Text>
                </Space>
              </Space>
            </Col>

            <Col style={{ marginBottom: 15 }}>
              <Space>
                <Text onClick={showNormalPostModal}>
                  <strong>565</strong>
                  {' '}
                  Following
                </Text>
                <Text>
                  <strong>565</strong>
                  {' '}
                  Followers
                </Text>
              </Space>
            </Col>
            <Col style={{ marginBottom: 15 }}>
              <Space>
                <Avatar src="https://media.discordapp.net/attachments/1112051630985187378/1122439026390073394/38308a08c26e275d9560bcbabeb74324.png?width=320&height=320" size="small" />
                <Avatar src="https://media.discordapp.net/attachments/1112051630985187378/1122439026390073394/38308a08c26e275d9560bcbabeb74324.png?width=320&height=320" size="small" />
                <Avatar src="https://media.discordapp.net/attachments/1112051630985187378/1122439026390073394/38308a08c26e275d9560bcbabeb74324.png?width=320&height=320" size="small" />
                <Text>Recent Followers</Text>
              </Space>
            </Col>
          </Col>

        </Row>
      </Card>
    </>
  );
};

export default UserProfile;
