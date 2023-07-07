import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import '../../styles/dashboard.css';

const DashBoard = () => (
  <>
    <h1>Petopia</h1>
    <header>
      <h2>DASHBOARD</h2>
    </header>
    <div className="dashboard">
      <SideBar />
      <div className="stats">
        <Outlet />
      </div>
    </div>
  </>
);

export default DashBoard;
