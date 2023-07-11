import React from 'react';
import { Card } from 'antd';
import TopRightSide from './TopRightSide';
import Trending from './Trending';
import Follow from './Follow';
import Box from '../commons/Box';

const RightSide = (): JSX.Element => {
  const boxStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    width: '100%',
    height: '100vh',
  };

  const rectangleWrapperStyle: React.CSSProperties = {
    border: 'none',
    height: '1024px',
    width: '337px',
  };

  const rectangleStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderColor: '#efeff4',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    width: '337px',
    height: '100vh',
  };

  return (
    <Box style={boxStyle}>
      <Box style={rectangleWrapperStyle}>
        <Card style={rectangleStyle} bordered={false}>
          <TopRightSide />
          <Trending />
          <Follow />
        </Card>
      </Box>
    </Box>
  );
};

export default RightSide;
