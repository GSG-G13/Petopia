import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import { LogoutOutlined } from '@ant-design/icons';
import SideBar from './SideBar';
import { AuthContext } from '../context/AuthContext';

import '../../styles/dashboard.css';
import Box from '../commons/Box';

const DashBoard = () => {
  const { userLogged, setUserLogged } = useContext(AuthContext);

  const handleLogout = () => {
    axios.get('/api/v1/auth/logout')
      .then((res) => {
        message.open({
          type: 'success',
          content: res.data.message,
        });
        setUserLogged(!userLogged);
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
          message.error('Something went wrong!');
        }
      });
  };
  return (
    <>
      <Link to="/feed"><h1>Petopia</h1></Link>
      <header>
        <h2>Dashboard</h2>
        <Button
          type="primary"
          shape="round"
          icon={<LogoutOutlined />}
          className="logout"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </header>
      <Box className="dashboard">
        <SideBar />
        <Box className="stats">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashBoard;
