import { Outlet, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import { LogoutOutlined } from '@ant-design/icons';
import SideBar from './SideBar';
import '../../styles/dashboard.css';

const DashBoard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.get('http://localhost:3000/api/v1/auth/logout')
      .then((res) => {
        message.open({
          type: 'success',
          content: res.data.message,
        });
        navigate('/login');
      })
      .catch((error) => {
      // handle error
        console.error(error);
      });
  };
  return (
    <>
      <h1>Petopia</h1>
      <header>
        <h2>Dashboard</h2>
        <Button type="primary" shape="round" icon={<LogoutOutlined />} className="logout" onClick={handleLogout}>
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
