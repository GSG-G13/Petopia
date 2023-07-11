import React, { useContext } from 'react';
import {
  BellOutlined, MessageOutlined, BookOutlined, LoginOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { message } from 'antd';
import Box from '../commons/Box';
import { AuthContext } from '../context/AuthContext';

const TopRightSide: React.FC = () => {
  const { userLogged, setUserLogged } = useContext(AuthContext);

  const parentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '276px',
    height: '50px',
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
  const logout = async () => {
    try {
      await axios.get('/api/v1/auth/logout');
      setUserLogged(!userLogged);
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  return (
    <Box style={parentStyle}>
      <Box style={iconWrapperStyle}>
        <BellOutlined style={iconStyle} className="notification" />
      </Box>
      <Box style={iconWrapperStyle}>
        <MessageOutlined style={iconStyle} className="message-text" />
      </Box>
      <Box style={iconWrapperStyle}>
        <BookOutlined style={iconStyle} className="bookmark" />
      </Box>
      <Box style={iconWrapperStyle} onClick={logout} className="pointer">
        <LoginOutlined style={iconStyle} className="login" />
      </Box>
    </Box>
  );
};

export default TopRightSide;
