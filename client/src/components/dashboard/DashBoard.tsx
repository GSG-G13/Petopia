import { useContext, useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import { LogoutOutlined } from '@ant-design/icons';
import SideBar from './SideBar';
import { AuthContext } from '../context/AuthContext';

import '../../styles/dashboard.css';
import Box from '../commons/Box';

type Stats = { postsCount: number, categoriesCount: number, usersCount: number };

const DashBoard = () => {
  const { userLogged, setUserLogged } = useContext(AuthContext);
  const [stats, setStats] = useState<Stats>({ postsCount: 0, categoriesCount: 0, usersCount: 0 });
  const [countChanged, setCountChanged] = useState<boolean>(false);

  useEffect(() => {
    axios.get('/api/v1/stats')
      .then(({ data: { data } }) => {
        setStats(data);
      }).catch((err) => {
        if (axios.isAxiosError(err) && err.response?.status !== 401) {
          message.error(err?.response?.data.message || 'Something went wrong!');
        }
      });
  }, [countChanged]);

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
          <Outlet context={{
            stats, countChanged, setCountChanged,
          }}
          />
        </Box>
      </Box>
    </>
  );
};

export default DashBoard;
