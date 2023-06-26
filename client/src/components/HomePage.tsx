import React, { useState } from 'react';
import { Layout, Row, Col, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import RightSide from './sideBars/RightSide';
import LeftSideBox from './sideBars/LeftSideBox';
import UserProfile from './userProfile/UserProfile';
import useWindowSize from './useWindowSize';

const { Content } = Layout;

const HomePage = () => {
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
    } else {
      return 12; 
    }
  };

  return (
    <Layout style={{ backgroundColor: '#f3f7fb' }}>
      <Row justify="center" align="top" style={{ minHeight: '100vh' }}>
        {size.width > 900 ? (
          <Col span={6}>
            <LeftSideBox />
          </Col>
        ) : (
          <Button type="primary" onClick={showDrawerLeft}>
            <MenuOutlined />
          </Button>
        )}

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

        <Col span={getProfileSpan()}>
          <UserProfile />
        </Col>

        {size.width > 1450 ? (
          <Col span={6}>
            <RightSide />
          </Col>
        ) : (
          <Button type="primary" onClick={showDrawerRight}>
            <MenuOutlined />
          </Button>
        )}

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
      </Row>
    </Layout>
  );
};

export default HomePage;
