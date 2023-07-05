import React, { useState } from 'react';
import {
  Layout, Row, Col, Drawer, Button, Space, Badge,
} from 'antd';
import { MenuOutlined, BellOutlined } from '@ant-design/icons';
import RightSide from './sideBars/RightSide';
import LeftSideBox from './sideBars/LeftSideBox';
import UserProfile from './userProfile/UserProfile';
import useWindowSize from './useWindowSize';

const { Header, Content } = Layout;

const HomePage = () => {
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

  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const size = useWindowSize();

  const showDrawerLeft = () => {
    setVisibleLeft(true);
  };

  const showDrawerRight = () => {
    setVisibleRight(true);
  };

  const onCloseLeft = () => {
    setVisibleLeft(false);
  };

  const onCloseRight = () => {
    setVisibleRight(false);
  };

  const getProfileSpan = () => {
    if (size.width <= 1000) {
      return 24;
    }
    return 12;
  };

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      {size.width <= 1000 && !visibleLeft && (
        <Header style={{
          backgroundColor: '#fff',
          position: 'fixed',
          zIndex: 1,
          width: '95%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        >

          <Space onClick={showDrawerLeft}>
            <Badge dot offset={[-10, 10]}>
              <div style={iconWrapperStyle}>
                <MenuOutlined style={iconStyle} />
              </div>
            </Badge>
          </Space>

          <Space onClick={showDrawerRight}>
            <Badge dot offset={[-10, 10]}>
              <div style={iconWrapperStyle}>
                <MenuOutlined style={iconStyle} />
              </div>
            </Badge>
          </Space>

        </Header>

      )}

      <Content>
        <Row justify="center" align="top" style={{ minHeight: '100vh' }}>
          {size.width > 1000 ? (
            <Col span={6}>
              <LeftSideBox />
            </Col>
          ) : (
            <Drawer
              title="Menu"
              placement="left"
              closable={false}
              onClose={onCloseLeft}
              visible={visibleLeft}
              getContainer={false}
              style={{ position: 'absolute' }}
            >
              <LeftSideBox />
            </Drawer>
          )}

          <Col span={getProfileSpan()}>
            <UserProfile />
          </Col>

          {size.width > 1450 ? (
            <Col span={6}>
              <RightSide />
            </Col>
          ) : (
            <Drawer
              title="Menu"
              placement="right"
              closable={false}
              onClose={onCloseRight}
              visible={visibleRight}
              getContainer={false}
              style={{ position: 'absolute' }}
            >
              <RightSide />
            </Drawer>
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
