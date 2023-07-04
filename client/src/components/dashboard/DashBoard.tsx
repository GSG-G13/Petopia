import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import '../../styles/dashboard.css';

const DashBoard = () => (
  <div className="dashboard">
    <SideBar />
    <div className="stats">
      <Outlet />
    </div>
  </div>
);

export default DashBoard;
