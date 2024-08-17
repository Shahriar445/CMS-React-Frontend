import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, DashboardOutlined, MonitorOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Design/sidebar.css';  // Add your own styles if needed

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider collapsible>
      <div className="logo" style={{ height: '32px', margin: '16px', color: 'white' }}>
        {/* You can add a logo or title here */}
        <h2 style={{ color: 'white' }}>Admin Panel</h2>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

          <>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/admin-dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/manage-users">Manage Users</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<MonitorOutlined />}>
              <Link to="/admin-monitor">Monitor</Link>
            </Menu.Item>
          </>
        
        {/* Add more roles here if necessary */}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
