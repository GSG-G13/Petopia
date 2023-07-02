import React from 'react';
import {
  BarChartOutlined,
  TeamOutlined,
  ApartmentOutlined,
  DatabaseOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';

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
  getItem('Stats', '1', <BarChartOutlined />),
  getItem('Users', '2', <TeamOutlined />),
  getItem('Categories', '3', <ApartmentOutlined />),
  getItem('Posts', '4', <DatabaseOutlined />),
  getItem('Profile', '5', <AuditOutlined />),
];

const SideBar: React.FC = () => (
  <Menu
    style={{ width: 256, fontSize: '17px' }}
    defaultSelectedKeys={['1']}
    items={items}
  />
);

export default SideBar;
