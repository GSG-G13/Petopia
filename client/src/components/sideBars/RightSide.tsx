import React from 'react';
import { Card } from 'antd';
import TopRightSide from './TopRightSide';
import Trending from './Trending';
import Follow from './Follow';

const RightSide = (): JSX.Element => {
  const boxStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    width: '100%',
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
  };

  return (
    <div style={boxStyle}>
      <div style={rectangleWrapperStyle}>
        <Card style={rectangleStyle} bordered={false}>
          <TopRightSide style={{}} />
          <Trending />
          <Follow />
        </Card>

      </div>
    </div>
  );
};

export default RightSide;
