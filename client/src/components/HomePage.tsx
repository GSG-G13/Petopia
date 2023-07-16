import { useContext, useState } from 'react';
import {
  Layout, Row, Col, Drawer, Space, Badge,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';
import RightSide from './sideBars/RightSide';
import LeftSideBox from './sideBars/LeftSideBox';
import useWindowSize from './useWindowSize';
import { AuthContext } from './context/AuthContext';
import FollowingCountContext from './context/FollowingCountContext';
import { IFollowingContext } from '../interfaces';

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
  const { userData } = useContext(AuthContext);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [followingCount, setFollowingCount] = useState(userData.followingCount);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const followingContextValue:IFollowingContext = {
    followingCount,
    setFollowingCount,
  };

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
    <Layout style={{ backgroundColor: 'transparent' }}>
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
      <FollowingCountContext.Provider value={followingContextValue}>
        <Content style={{ margin: 0 }}>
          <Row
            justify="center"
            align="top"
            style={{
              minHeight: '100vh',
              minWidth: '100vw',
              margin: 0,
              padding: 0,
            }}
          >
            {size.width > 1000 ? (
              <Col span={6} style={{ margin: 0 }}>
                <LeftSideBox />
              </Col>
            ) : (
              <Drawer
                title="Menu"
                placement="left"
                closable={false}
                onClose={onCloseLeft}
                open={visibleLeft}
                getContainer={false}
                rootStyle={{ position: 'absolute' }}
              >
                <LeftSideBox />
              </Drawer>
            )}
            <Col span={getProfileSpan()}>
              <Outlet />
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
                open={visibleRight}
                getContainer={false}
                rootStyle={{ position: 'absolute' }}
              >
                <RightSide />
              </Drawer>
            )}
          </Row>
        </Content>
      </FollowingCountContext.Provider>
    </Layout>
  );
};

export default HomePage;
