import React from 'react';
import {
  BarChartOutlined,
  TeamOutlined,
  ApartmentOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/dashboard">Stats</Link>, '1', <BarChartOutlined />),
  getItem(<Link to="/dashboard/users">Users</Link>, '2', <TeamOutlined />),
  getItem(<Link to="/dashboard/posts">Posts</Link>, '3', <DatabaseOutlined />),
  getItem(<Link to="/dashboard/categories">Categories</Link>, '4', <ApartmentOutlined />),
];

const SideBar: React.FC = () => {
  const location = useLocation();

  const selectedKeys = items
    .filter((item: any) => item.label.props.to === location.pathname)
    .map((item: any) => item.key);
  return (
    <Menu
      className="dash-menu"
      selectedKeys={selectedKeys}
      items={items}
    />
  );
};

export default SideBar;
