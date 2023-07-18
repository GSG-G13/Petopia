import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import { LogoutOutlined } from '@ant-design/icons';
import SideBar from './SideBar';
import { AuthContext } from '../context/AuthContext';

import '../../styles/dashboard.css';

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
      <h1>Petopia</h1>
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
      <div className="dashboard">
        <SideBar />
        <div className="stats">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
