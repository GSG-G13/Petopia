import React from "react";
import { BellOutlined, MessageOutlined, BookOutlined, LoginOutlined } from '@ant-design/icons';

interface Props {
  style: any;
}

const TopRightSide: React.FC<Props> = ({ style }) => {
  const parentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '276px',
    height: '50px',
    ...style,
  };

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

  return (
    <div style={parentStyle}>
      <div style={iconWrapperStyle}>
        <BellOutlined style={iconStyle} className="notification" />
      </div>
      <div style={iconWrapperStyle}>
        <MessageOutlined style={iconStyle} className="message-text" />
      </div>
      <div style={iconWrapperStyle}>
        <BookOutlined style={iconStyle} className="bookmark" />
      </div>
      <div style={iconWrapperStyle}>
        <LoginOutlined style={iconStyle} className="login" />
      </div>
    </div>
  );
};

export default TopRightSide;
